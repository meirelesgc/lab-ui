import requests
import streamlit as st

URL = "http://localhost:8000"


def load_single_document(document_id):
    response = requests.post(f"{URL}/open-ai/document/{document_id}")
    if response.status_code == 200:
        document_json = response.json()
        document_json = list_single_json_documents(document_id)
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


def update_json_documents(document): ...


def evaluate_response(document):
    document_json = list_single_json_documents(document["document_id"])
    if not document_json:
        document_json = load_single_document(document["document_id"])

    items = list(document_json["document_json"].items())
    num_columns = 3
    columns = st.columns(num_columns)
    for index, (key, value) in enumerate(items):
        column_index = index % num_columns
        with columns[column_index].popover(key, use_container_width=True):
            document_json["document_json"][key] = st.text_input(
                "Atualizar parametro", value=value, key=f"att_{key}"
            )
        columns[column_index].info(value)
    container = st.container()
    col1, col2 = container.columns(1, 1)
    document["rating"] = col1.feedback("stars")
