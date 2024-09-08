import streamlit as st
from controllers.documents import (
    upload_file,
    delete_file,
    get_files,
)
from controllers.parameters import (
    get_parameters,
    create_parameter,
    update_parameter,
    delete_parameter,
)
from controllers.openai import get_json_openai, create_json_openai

st.set_page_config(
    page_title="Lab - Extraindo dados de documentos",
    page_icon="🤓",
    layout="wide",
)

URL = "http://localhost:8000"

STATUS_EMOJIS = {
    "DONE": "✅ - Concluido",
    "STANDBY": "🔍 - Aguardando revisão",
    "IN-PROCESS": "🔄 - Processando",
    "FAILED": "❌ - Problema com o documento",
}


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
            else:
                st.error("Por favor, insira um arquivo.")

        st.divider()

        st.title("Status dos Arquivos")
        for status, description in STATUS_EMOJIS.items():
            st.write(f"{description}")

        st.write("Arquivos Enviados")

        inspect_document = {}
        documents = get_files()

        if documents:
            for document in documents:
                with st.expander(f"{document['name'][:-4]} - {document['status']}"):
                    if st.button("Inspecionar", key=f'i_{document["document_id"]}'):
                        inspect_document = document
                    if st.button("Deletar", key=f'del_{document["document_id"]}'):
                        delete_file(document["document_id"])

    with tab2:
        st.title("Inserir parametro")
        parameter = st.text_input("Digite aqui o novo parametro")
        if st.button("Enviar", key="send_parameter"):
            if parameter:
                create_parameter(parameter)
            else:
                st.error("Insira um parametro")

        st.title("Lista de parametros")
        parameters = get_parameters()
        if parameters:
            for parameter in parameters:
                with st.expander(parameter["parameter"]):
                    if update_parameter(parameter):
                        st.toast("Parâmetro atualizado com sucesso!")
                        st.rerun()
                    if st.button("❌", key=f'del_{parameter['parameter_id']}'):
                        delete_parameter(parameter["parameter_id"])
        else:
            st.info("Os parametros cadastrados vão aparecer aqui")

if inspect_document:
    container = st.container()
    col1, col2 = container.columns([3, 2])
    with col1:
        st.title(inspect_document["name"][:-4])
        st.markdown(
            f"""
                <iframe 
                    src="{URL}/file/{inspect_document["document_id"]}" 
                    width="700" 
                    height="1000" 
                    style="border: none;">
                </iframe>
                """,
            unsafe_allow_html=True,
        )
    with col2:
        st.title("Painel de controle")
        info = get_json_openai(inspect_document["document_id"])
        if not info:
            info = create_json_openai(inspect_document["document_id"])
        st.json(info)
