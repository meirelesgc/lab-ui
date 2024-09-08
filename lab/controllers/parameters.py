import requests
import streamlit as st
from uuid import UUID

URL = "http://localhost:8000"


def get_parameters():
    response = requests.get(f"{URL}/parameter")
    if response.status_code == 200:
        parameters = response.json()
        parameters = sorted(parameters, key=lambda n: n["parameter"])
        return parameters


def create_parameter(parameter_id: UUID):
    response = requests.post(f"{URL}/parameter?parameter={parameter_id}")
    if response.status_code == 201:
        st.success("Parâmetro criado com sucesso!")
        st.rerun()
    else:
        st.error(
            "Ocorreu um problema ao criar o parâmetro. Tente novamente mais tarde."
        )


def delete_parameter(parameter_id: UUID):
    response = requests.delete(f"{URL}/parameter/{parameter_id}")
    if response.status_code == 200:
        st.success("Parâmetro deletado com sucesso!")
        st.rerun()
    else:
        st.error(
            "Ocorreu um problema ao deletar o parâmetro. Tente novamente mais tarde."
        )


def send_update_parameter(parameter):
    parameter["synonyms"] = [
        synonym for synonym in parameter["synonyms"] if synonym is not None
    ]
    response = requests.put(f"{URL}/parameter", json=parameter)
    if response.status_code == 200:
        st.success("Parâmetro atualizado com sucesso!")
        st.rerun()
    else:
        st.error("Erro ao atualizar o parâmetro.")
