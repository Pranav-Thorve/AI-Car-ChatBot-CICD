FROM python:3.10-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

# install CPU-only PyTorch (works on Python 3.10)
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]

