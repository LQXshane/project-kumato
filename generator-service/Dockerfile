# Dockerfile

# pull the official docker image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

# set work directory
WORKDIR /app

# install dependencies
COPY requirements.txt .
# RUN pip install -r requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# copy project
COPY . .

CMD uvicorn api:app --host 0.0.0.0 --port 5555