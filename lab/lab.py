import streamlit as st
from datetime import datetime
from uuid import uuid4
from controllers.documents import (
    att_metadata,
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
from controllers.patient import (
    create_patient,
    get_patients,
    delete_patient,
)
import os

URL = os.getenv("URL", "http://localhost:8000")

STATUS_EMOJIS = {
    "DONE": "✅ - Revisado",
    "STANDBY": "🔍 - Aguardando revisão",
    "IN-PROCESS": "🔄 - Em processamento",
    "FAILED": "❌ - Erro ao processar o documento",
}
if "INSPECT_DOCUMENT" not in st.session_state:
    st.session_state.INSPECT_DOCUMENT = {}


def parse_date(item):
    return datetime.strptime(item["created_at"], "%d/%m/%Y %H:%M")


@st.fragment(run_every="10s")
def render_list_files():
    st.title("Arquivos Enviados")
    documents = get_files()
    if documents:
        recently_document = max(
            documents,
            key=lambda x: datetime.strptime(x["created_at"], "%d/%m/%Y %H:%M"),
        )
        st.subheader("Mais recente")
        with st.expander(
            f"[{recently_document['document_id'][:7]}] {recently_document['name'][:-4]} :blue[Data: {recently_document['created_at']}]",
            icon=STATUS_EMOJIS[recently_document["status"]][0],
        ):
            col1, col2 = st.columns([1, 1])
            with col1:
                if st.button(
                    "📂 Revisar",
                    key=f'ii_{recently_document["document_id"]}',
                    use_container_width=True,
                    disabled=not bool(
                        recently_document["status"] != "FAILED"
                        and recently_document["status"] != "IN-PROCESS"
                    ),
                ):
                    st.session_state.INSPECT_DOCUMENT = recently_document
                    st.rerun()
            with col2:
                if st.button(
                    "🗑️ Excluir",
                    key=f'dell_{recently_document["document_id"]}',
                    use_container_width=True,
                ):
                    try:
                        if (
                            st.session_state.INSPECT_DOCUMENT["document_id"]
                            == recently_document["document_id"]
                        ):
                            st.session_state.INSPECT_DOCUMENT = {}
                    except Exception:
                        ...
                    delete_file(recently_document["document_id"])
                    st.success(
                        f"Documento {recently_document['name'][:-4]} deletado com sucesso."
                    )

        st.subheader("Lista completa")
        for document in documents:
            with st.expander(
                f"[{document['document_id'][:7]}] {document['name'][:-4]} :blue[Data: {document['created_at']}]",
                icon=STATUS_EMOJIS[document["status"]][0],
            ):
                render_files(document)
    else:
        st.info("Nenhum arquivo foi enviado ainda.")


def render_files(document):
    col1, col2 = st.columns([1, 1])
    with col1:
        if st.button(
            "📂 Revisar",
            key=f'i_{document["document_id"]}',
            use_container_width=True,
            disabled=not bool(
                document["status"] != "FAILED" and document["status"] != "IN-PROCESS"
            ),
        ):
            st.session_state.INSPECT_DOCUMENT = document
            st.rerun()
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
    page_title="iaDocSaude - Extração de Dados de Documentos",
    layout="wide",
)


@st.dialog("Enviar documento")
def send_file():
    st.title("Envio de Arquivo")
    uploaded_file = st.file_uploader(
        "Selecione um arquivo PDF para enviar 🌠",
        type="pdf",
        label_visibility="collapsed",
    )
    patients = get_patients()
    if patients:
        selected_patient = st.selectbox(
            "Esse laudo se refere a que paciente?",
            patients,
            format_func=lambda x: x["name"],
        )
    else:
        st.info("Adicione um paciente antes de prosseguir")
    date = st.date_input("Data do laudo", key="send_report_date")
    if st.button(
        "Enviar",
        key="send_file",
        disabled=not bool(uploaded_file and date and selected_patient),
    ):
        document = upload_file(uploaded_file)
        att_metadata(
            document["document_id"],
            selected_patient.get("patient_id"),
            date.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
        )
        st.rerun()


with st.sidebar:
    st.title("iaDocSaude")
    tab1, tab2, tab3 = st.tabs(["Arquivos", "Parâmetros", "Pacientes"])

    with tab1:
        st.title("Status dos Arquivos")
        st.write("Abaixo estão os estados possíveis dos documentos:")
        for status, description in STATUS_EMOJIS.items():
            st.write(f"{description}")
        st.divider()
        if st.button("Enviar novo documento", use_container_width=True):
            try:
                send_file()
                st.toast("Arquivo enviado com sucesso!")
            except Exception:
                st.toast("Erro ao incerrir o arquivo")
        render_list_files()

    with tab2:
        st.title("Inserir Novo Parâmetro")
        parameter = st.text_input("Digite o novo parâmetro:")
        if st.button("Enviar Parâmetro", key="send_parameter"):
            if parameter:
                create_parameter(parameter)
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
    with tab3:
        st.title("Adicionar novo paciente")
        patient = st.text_input("Digite o nome do novo paciente:")
        if st.button("Enviar", key="send_patient"):
            if patient:
                create_patient(patient)
                st.success("Paciente adicionado com sucesso")
            else:
                st.error("Por favor, insira um nome primeiro")
        st.title("Lista de pacientes")
        patients = get_patients()
        if patients:
            for patient in patients:
                with st.expander(patient["name"]):
                    if st.button(
                        "🗑️ Excluir",
                        key=f'del_{patient['patient_id']}',
                        use_container_width=True,
                    ):
                        delete_patient(patient["patient_id"])

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
