import streamlit as st
from controllers.documents import (
    upload_file,
    delete_file,
    get_files,
)


URL = "http://localhost:8000"


st.title("Enviar Arquivo")

uploaded_file = st.file_uploader("Escolha um arquivo PDF 🌠", type="pdf")

if uploaded_file is not None:
    if st.button("Enviar"):
        upload_file(uploaded_file)

st.title("Lista de Arquivos")

documents = get_files()
if documents:
    container = st.container()
    a, b = container.columns(2)
    for document in documents:
        container = st.container()
        a, b = container.columns([8, 3])
        a.info(document["name"])
        with b.popover(document["status"]):
            if st.button("Inspecionar", key=f'i_{document['document_id']}'):
                ...
            if st.button("Deletar", key=f'del_{document['document_id']}'):
                delete_file(document["document_id"])
            st.link_button("Download", url=f"{URL}/file/{document["document_id"]}")
