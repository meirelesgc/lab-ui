import requests
import streamlit as st
import os

URL = os.getenv("URL", "http://localhost:8000")


def load_single_document(document_id):
    response = requests.post(f"{URL}/open-ai/document/{document_id}")
    if response.status_code == 200:
        document_json = response.json()
        st.rerun()
        return document_json
    else:
        st.error(
            "Ocorreu um problema ao extrair as informações. Tente novamente mais tarde."
        )


def load_document(): ...


def list_single_json_documents(document_id):
    response = requests.get(f"{URL}/open-ai/document/{document_id}")
    if response.status_code == 200:
        document_json = response.json()
        return document_json
    elif response.status_code == 404:
        return None


def list_json_documents(): ...


def update_json_documents(document_json):
    response = requests.put(f"{URL}/open-ai/document", json=document_json)
    if response.status_code != 200:
        st.error("Ocorreu um problema. Tente novamente mais tarde.")
    else:
        st.toast("Sucesso ao atualizar os dados")


def evaluate_response(document):
    document_json = list_single_json_documents(document["document_id"])

    if not document_json:
        st.toast("Extraindo dados...")
        document_json = load_single_document(document["document_id"])

    if not document_json.get("evaluated_document_json"):
        document_json["evaluated_document_json"] = document_json["document_json"]

    st.subheader("Dados coletados pela IA")
    items = list(document_json["document_json"].items())
    num_columns = 3
    columns = st.columns(num_columns)

    for index, (key, value) in enumerate(items):
        column_index = index % num_columns
        columns[column_index].metric(key, value=value)

    st.subheader("Qualidade dos dados coletados")
    document_json["rating"] = st.feedback(options="stars") or 0

    st.subheader("Revise os dados")
    columns = st.columns(num_columns)

    for index, (key, value) in enumerate(items):
        column_index = index % num_columns

        with columns[column_index].popover(key, use_container_width=True):
            document_json["evaluated_document_json"][key] = st.text_input(
                "Atualizar valor", value=value, key=f"att_{key}"
            )
        columns[column_index].info(document_json["evaluated_document_json"][key])
    if st.button("Enviar"):
        update_json_documents(document_json)
