FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create virtual environment
RUN python3 -m venv /app/venv

# Upgrade pip inside venv
RUN /app/venv/bin/pip install --upgrade pip

# Install CPU-only Torch separately inside venv
RUN /app/venv/bin/pip install torch --index-url https://download.pytorch.org/whl/cpu

# Install all other dependencies inside venv
COPY requirements.txt .
RUN /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

RUN chmod +x entrypoint.sh

# Use venv python in entrypoint
ENV PATH="/app/venv/bin:$PATH"

EXPOSE 9000

CMD ["./entrypoint.sh"]

