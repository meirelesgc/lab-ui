import streamlit as st
from controllers.documents import (
    upload_file,
    delete_file,
    get_files,
)
from controllers.parameters import (
    get_parameters,
    create_parameter,
    delete_parameter,
    send_update_parameter,
)
from controllers.openai import evaluate_response
import os

URL = os.getenv("URL", "http://localhost:8000")
STATUS_EMOJIS = {
    "DONE": "✅ - Concluído",
    "STANDBY": "🔍 - Aguardando revisão",
    "IN-PROCESS": "🔄 - Em processamento",
    "FAILED": "🗑️ - Erro ao processar o documento",
}
if "INSPECT_DOCUMENT" not in st.session_state:
    st.session_state.INSPECT_DOCUMENT = {}


def render_files(document):
    col1, col2 = st.columns([1, 1])
    with col1:
        if st.button(
            "📂 Revisar",
            key=f'i_{document["document_id"]}',
            use_container_width=True,
        ):
            st.session_state.INSPECT_DOCUMENT = document

    with col2:
        if st.button(
            "🗑️ Excluir",
            key=f'del_{document["document_id"]}',
            use_container_width=True,
        ):
            try:
                if (
                    st.session_state.INSPECT_DOCUMENT["document_id"]
                    == document["document_id"]
                ):
                    st.session_state.INSPECT_DOCUMENT = {}
            except Exception:
                ...
            delete_file(document["document_id"])
            st.success(f"Documento {document['name'][:-4]} deletado com sucesso.")


def update_parameter(parameter):
    parameter["parameter"] = st.text_input(
        "Editar",
        value=parameter["parameter"],
        key=f"input_{parameter['parameter_id']}",
    )
    st.write("Lista de sinonimos encontrados")

    if not parameter["synonyms"]:
        parameter["synonyms"] = ["Altere aqui"]

    parameter["synonyms"] = st.data_editor(
        parameter["synonyms"],
        use_container_width=True,
        num_rows="dynamic",
        key=f"edit_{parameter['parameter_id']}",
    )

    col1, col2 = st.columns([1, 1])
    with col1:
        if st.button(
            "♻️ Atualizar",
            key=f'att_{parameter["parameter_id"]}',
            use_container_width=True,
        ):
            send_update_parameter(parameter)
    with col2:
        if st.button(
            "🗑️ Excluir",
            key=f'del_{parameter["parameter_id"]}',
            use_container_width=True,
        ):
            delete_parameter(parameter["parameter_id"])
            st.success("Parâmetro deletado com sucesso!")


st.set_page_config(
    page_title="Lab - Extração de Dados de Documentos",
    page_icon="🤓",
    layout="wide",
)


with st.sidebar:
    tab1, tab2 = st.tabs(["Arquivos", "Parâmetros"])

    with tab1:
        st.title("Envio de Arquivo")
        uploaded_file = st.file_uploader(
            "Selecione um arquivo PDF para enviar 🌠",
            type="pdf",
            label_visibility="collapsed",
        )

        if st.button("Enviar", key="send_file"):
            if uploaded_file:
                upload_file(uploaded_file)
                st.success("Arquivo enviado com sucesso!")
            else:
                st.error("Por favor, selecione um arquivo antes de enviar.")

        st.divider()

        st.title("Status dos Arquivos")
        st.write("Abaixo estão os estados possíveis dos documentos:")
        for status, description in STATUS_EMOJIS.items():
            st.write(f"{description}")

        st.write("Arquivos Enviados")

        documents = get_files()

        if documents:
            for document in documents:
                with st.expander(
                    f"{document['name'][:-4]} - Status: {STATUS_EMOJIS[document['status']]}",
                ):
                    render_files(document)
        else:
            st.info("Nenhum arquivo foi enviado ainda.")

    with tab2:
        st.title("Inserir Novo Parâmetro")
        parameter = st.text_input("Digite o novo parâmetro:")
        if st.button("Enviar Parâmetro", key="send_parameter"):
            if parameter:
                create_parameter(parameter)
                st.success("Parâmetro criado com sucesso!")
            else:
                st.error("Por favor, insira um valor para o parâmetro.")

        st.title("Lista de Parâmetros")
        parameters = get_parameters()
        if parameters:
            for parameter in parameters:
                with st.expander(
                    parameter["parameter"],
                ):
                    update_parameter(parameter)
        else:
            st.info("Nenhum parâmetro cadastrado ainda.")

if st.session_state.INSPECT_DOCUMENT:
    container = st.container()
    col1, col2 = container.columns([3, 2])
    with col1:
        st.title(f"Documento: {st.session_state.INSPECT_DOCUMENT['name'][:-4]}")
        st.markdown(
            f"""
                <iframe 
                    src="{URL}/file/{st.session_state.INSPECT_DOCUMENT['document_id']}" 
                    width="700" 
                    height="1000" 
                    style="border: none;">
                </iframe>
                """,
            unsafe_allow_html=True,
        )
    with col2:
        evaluate_response(st.session_state.INSPECT_DOCUMENT)
