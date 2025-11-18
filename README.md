🚀 CarHero AI – Cloud-Native AI Chatbot for Luxury & Sports Cars

Production-ready ML + FastAPI + React + Docker + Jenkins + ECR + EKS

CarHero AI is an end-to-end, production-grade AI system that analyzes user queries about luxury/sports cars and provides accurate answers based on custom-trained data.
The system is fully automated with CI/CD pipelines, containerized services, cloud deployments, and retrainable models.

🧠 Project Overview

CarHero is built with a modular MLOps architecture:

Custom GPT-2 based AI model trained on curated car knowledge

FastAPI inference service pulling model weights from S3

React-based frontend acting as the user chat interface

Fully containerized with Docker

Pushed to AWS ECR, deployed via Docker Compose and EKS

Jenkins CI/CD pipelines for:

Automated model training

Automated image build + ECR push

Deployment updates (EKS rollout restart)


📂 Directory Structure
carhero/
│
├── model/               # Training pipeline
│   ├── train.py
│   ├── model.py
│   ├── datasets/
│   │    └── data.txt
│   ├── weights/
│   └── Jenkinsfile      # Model training → S3 upload
│
├── inference/           # Inference backend
│   ├── model_server.py
│   ├── model.py
│   ├── download_weights.py
│   ├── requirements.txt
│   ├── entrypoint.sh
│   ├── Dockerfile
│   └── Jenkinsfile      # Build → Push → Deploy
│
├── frontend/            # React UI
│   ├── src/
│   ├── Dockerfile
│   └── Jenkinsfile      # Build → Push
│
└── docker-compose.yml   # Local deployment

⚙️ Model Training (Jenkins)

Training pipeline:

Installs dependencies

Runs train.py

Saves weights → model/weights/

Syncs weights to S3 bucket

Ready for inference service to pull updated weights

🚀 Inference Service

FastAPI app

Loads model dynamically from S3 at container startup

Exposes:

POST /infer
{
  "query": "tell me about Ferrari"
}


Responds with AI-generated output based on trained data

🌐 Frontend

Minimal React chat UI:

User types question

UI sends a POST request to the backend inference API

Displays AI answer

Beautiful, clean, responsive design

Built inside Docker + served using Nginx

🐳 Docker & ECR

Each component has its own Dockerfile:

Model Training (optional)

Inference API

Frontend

Images pushed using Jenkins:

aws ecr get-login-password | docker login …
docker build …
docker push …

☸️ Kubernetes (EKS Deployment)

Inference API deployed to EKS

Uses IRSA for S3 access

Rollout restarts triggered automatically via Jenkins

Highly scalable and fault-tolerant

Future-ready for autoscaling or GPU inference

🔄 CI/CD Pipelines (Jenkins)
Training Pipeline

Pull code

Train model

Upload new weights to S3

Trigger inference deploy

Inference Deployment Pipeline

Build Docker image

Push to ECR

Restart EKS deployment

Frontend Pipeline

Build React app in Docker

Push frontend image to ECR

🧪 Local Development via Docker Compose
docker compose up --build -d


Frontend → http://localhost:3000

Backend → http://localhost:9000

📦 Technologies Used
Layer	Tech
Model	GPT-2, PyTorch, HuggingFace Transformers
Backend	FastAPI, Uvicorn
Frontend	React + Vite + Nginx
Build	Docker, Docker Compose
Infrastructure	AWS ECR, S3, EKS
CI/CD	Jenkins
Training Data	Custom car dataset
🚀 Future Enhancements

Integrate CloudFront for frontend delivery

Add RDS for conversation history

Add GPT-Finetuning upgrades

Autoscaling inference pods

GPU-enabled training pipeline

🤝 Contributing

Feel free to open PRs, issues, or feature requests.
This project is under active development.

📝 License

MIT License.
