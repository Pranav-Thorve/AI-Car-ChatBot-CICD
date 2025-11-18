import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import CarBotModel

# ------------------------------------------------------------
# Logging
# ------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_server")

# ------------------------------------------------------------
# FastAPI App
# ------------------------------------------------------------
app = FastAPI(title="CarBot Model Service", version="1.0")

# ------------------------------------------------------------
# CORS (IMPORTANT for frontend)
# ------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # allow all origins (frontend, local dev, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# Request Body
# ------------------------------------------------------------
class Query(BaseModel):
    question: str

# ------------------------------------------------------------
# Global model object
# ------------------------------------------------------------
MODEL_DIR = os.getenv("MODEL_LOCAL_DIR", "/app/weights")
MODEL = None


# ------------------------------------------------------------
# Load model at startup
# ------------------------------------------------------------
@app.on_event("startup")
def load_model():
    global MODEL

    logger.info("Starting CarBot Model Server...")
    logger.info(f"Loading weights from: {MODEL_DIR}")

    if not os.path.exists(MODEL_DIR):
        logger.error(f"MODEL DIRECTORY NOT FOUND → {MODEL_DIR}")
        return

    try:
        MODEL = CarBotModel(MODEL_DIR)
        logger.info("Model loaded successfully 🚗🔥")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        MODEL = None


# ------------------------------------------------------------
# Health endpoint
# ------------------------------------------------------------
@app.get("/health")
def health():
    return {"ready": MODEL is not None}


# ------------------------------------------------------------
# Inference endpoint
# ------------------------------------------------------------
@app.post("/infer")
def infer(query: Query):
    global MODEL

    if MODEL is None:
        logger.error("Inference request received but model not loaded")
        return {"answer": "Model not ready"}

    try:
        logger.info(f"Received question: {query.question}")
        answer = MODEL.generate(query.question)
        logger.info(f"Answer: {answer}")
        return {"answer": answer}
    except Exception as e:
        logger.error(f"Inference failed: {e}")
        return {"answer": "Error during inference"}

