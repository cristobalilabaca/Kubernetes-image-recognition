FROM python:3.7

ENV PYTHONUNBUFFERED 1

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS "./backend/creds.json"

CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 backend.wsgi:application