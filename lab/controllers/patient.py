import requests
import streamlit as st
import os

URL = os.getenv("URL", "http://localhost:8000")


def create_patient(patient):
    response = requests.post(f"{URL}/patient?name={patient}")
    if response.status_code == 201:
        st.success("Paciente criado com sucesso!")
        st.rerun()
    else:
        st.error(
            "Ocorreu um problema ao adicionar um novo paciente. Tente novamente mais tarde."
        )


def get_patients():
    response = requests.get(f"{URL}/patient")
    if response.status_code == 200:
        patient = response.json()
        return patient


def delete_patient(patient_id):
    response = requests.delete(f"{URL}/patient/{patient_id}")
    if response.status_code == 200:
        st.success("Paciente deletado com sucesso!")
        st.rerun()
    else:
        st.error(
            "Ocorreu um problema ao excluir o paciente. Tente novamente mais tarde."
        )
