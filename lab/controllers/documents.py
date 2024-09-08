import streamlit as st
import requests
from datetime import datetime

URL = "http://localhost:8000"


def upload_file(file):
    files = {"file": (file.name, file, "application/pdf")}
    response = requests.post(f"{URL}/file", files=files)
    if response.status_code == 201:
        st.toast("Arquivo enviado com sucesso! 💫")
        st.rerun()
    else:
        st.toast(f"Falha no upload: {response.text} ⚙️")


status_emojis = {
    "DONE": "✅",
    "STANDBY": "🔍",
    "IN-PROCESS": "🔄",
    "FAILED": "❌",
}


def get_files():
    response = requests.get(f"{URL}/file")
    if response.status_code == 200:
        files = response.json()
        for file in files:
            file["status"] = status_emojis.get(file["status"], "🔍")
        return files
    else:
        st.info("Documentos anexados vão aparecer aqui")
        return []


def delete_file(document_id):
    response = requests.delete(f"{URL}/file/{document_id}")
    if response.status_code == 200:
        st.toast("Arquivo removido com sucesso")
        st.rerun()
    else:
        st.error("Encontramos um problema, tente novamente mais tarde")


def format_date(iso_date):
    dt = datetime.fromisoformat(iso_date)
    return dt.strftime("%d/%m/%Y %H:%M:%S")
