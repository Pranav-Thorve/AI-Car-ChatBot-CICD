**CarHero AI** is a cloud-native AI chatbot that provides detailed information about luxury and sports cars using a custom-trained GPT-2 model.The system includes:

*   **Model Training Pipeline** – fine-tunes GPT-2 on curated car data and uploads updated weights to **S3**.
    
*   **Inference API** – FastAPI service that downloads model weights from S3 at startup and serves responses via /infer.
    
*   **Frontend UI** – a minimal React-based chat interface for user queries.
    
*   **Containerized Architecture** – all components run as Docker images and are stored in **AWS ECR**.
    
*   **CI/CD with Jenkins** – automated model training, Docker builds, image pushes, and deployment updates.
    
*   **Production Deployment Ready** – supports Docker Compose locally and scalable deployment on **AWS EKS** using IRSA for secure S3 access.
    

This project demonstrates a full MLOps workflow: model training → artifact storage → inference serving → frontend integration → automated CI/CD → cloud deployment.
