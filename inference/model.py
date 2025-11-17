from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os

class CarBotModel:
    def __init__(self, model_dir=None):
        base = model_dir or os.getenv("MODEL_LOCAL_DIR", "/app/weights")
        self.tokenizer = GPT2Tokenizer.from_pretrained(base)
        self.model = GPT2LMHeadModel.from_pretrained(base)

    def generate(self, text, max_length=120):
        inputs = self.tokenizer(text, return_tensors="pt")
        output_ids = self.model.generate(
            **inputs,
            max_length=max_length,
            do_sample=True,
            temperature=0.7,
            top_k=50,
            top_p=0.95,
            pad_token_id=self.tokenizer.eos_token_id
        )
        return self.tokenizer.decode(output_ids[0], skip_special_tokens=True)

