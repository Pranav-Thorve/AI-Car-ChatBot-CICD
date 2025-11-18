from fastapi import FastAPI
from pydantic import BaseModel
import os
import logging
from model import CarBotModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_server")

app = FastAPI(title="CarBot Model Service")

class Query(BaseModel):
    question: str

@app.on_event("startup")
def load_model():
    global MODEL
    model_dir = os.getenv("MODEL_LOCAL_DIR", "/app/weights")

    if not os.path.isdir(model_dir):
        logger.error("Model directory does not exist: %s", model_dir)
        return

    logger.info("Loading model from %s", model_dir)
    MODEL = CarBotModel(model_dir)
    logger.info("Model loaded successfully")

@app.get("/health")
def health():
    return {"ready": "MODEL" in globals()}

@app.post("/infer")
def infer(q: Query):
    if "MODEL" not in globals():
        return {"answer": "Model not ready"}

    answer = MODEL.generate(q.question)

    if len(answer.strip()) < 5 or answer.lower().startswith("tell me"):
        return {"answer": "I don't know about this car."}

    return {"answer": answer}

