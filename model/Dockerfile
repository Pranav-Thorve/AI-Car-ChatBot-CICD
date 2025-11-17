FROM python:3.11-slim

# Install system deps
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy & install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model code + weights
COPY . .

# Ensure weights exist
RUN test -d weights

EXPOSE 9000

# Run the model server
CMD ["uvicorn", "model_server:app", "--host", "0.0.0.0", "--port", "9000"]

