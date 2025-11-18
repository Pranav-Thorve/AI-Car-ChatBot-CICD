FROM pytorch/pytorch:2.1.0-cpu-py3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]

