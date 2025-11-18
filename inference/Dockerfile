FROM pytorch/pytorch:2.1.0-cpu

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 9000

CMD ["./entrypoint.sh"]

