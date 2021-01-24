FROM python:3.9
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install --user -U nltk
RUN pip install rake-nltk
COPY . .
RUN python3 manage.py makemigrations
EXPOSE 8000
# CMD ["python3", "manage.py", "migrate"]