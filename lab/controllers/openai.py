import requests
import streamlit as st

URL = "http://localhost:8000"


def get_json_openai(document_id):
    response = requests.get(f"{URL}/open-ai/document/{document_id}")
    if response.status_code == 200:
        info = response.json()
        return info


def create_json_openai(document_id):
    response = requests.post(f"{URL}/open-ai/document/{document_id}")
    if response.status_code == 200:
        info = response.json()
        return info
