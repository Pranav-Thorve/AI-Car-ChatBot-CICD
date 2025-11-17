#!/bin/bash
set -e

echo "Downloading model weights from S3..."
python download_weights.py

echo "Starting model inference server..."
exec uvicorn model_server:app --host 0.0.0.0 --port 9000

