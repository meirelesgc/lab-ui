import streamlit as st
import requests
import datetime
import os

URL = os.getenv("URL", "http://localhost:8000")


def upload_file(file):
    files = {"file": (file.name, file, "application/pdf")}
    response = requests.post(f"{URL}/file", files=files)
    if response.status_code == 201:
        st.toast("Arquivo enviado com sucesso! 💫")
        return response.json()
    else:
        st.toast("Falha no upload")


def att_metadata(document_id, patient_id, date):
    metadata = {
        "document_id": document_id,
        "patient_id": patient_id,
        "document_date": date,
    }
    response = requests.put(f"{URL}/file/metadata", json=metadata)
    if response.status_code == 200:
        st.toast("Dados atualziados com sucesso")
    else:
        st.toast("Encontramos um problema, tente novamente mais tarde")


def get_files():
    response = requests.get(f"{URL}/file")
    if response.status_code == 200:
        files = response.json()

        for file in files:
            created_at = datetime.datetime.fromisoformat(file["created_at"])
            file["created_at"] = created_at.strftime("%d/%m/%Y %H:%M")

        return files
    else:
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
