FROM python:3.11-slim

# Install lightweight build tools (no heavy libs)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install CPU-only PyTorch & deps
COPY requirements.txt .
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu -r requirements.txt

# Copy only application code (NO WEIGHTS)
COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]

