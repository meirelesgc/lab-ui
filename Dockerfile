FROM python:3.12-slim
ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app
COPY . .

RUN pip install poetry
RUN poetry config installer.max-workers 10
RUN poetry install --no-interaction --no-ansi

EXPOSE 8501

CMD ["poetry", "run", "streamlit", "run", "lab/lab.py", "--server.port=8501", "--server.address=0.0.0.0", "--server.enableCORS=False", "--server.baseUrlPath=/lab-ui"]