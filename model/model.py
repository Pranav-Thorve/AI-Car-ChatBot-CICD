from transformers import GPT2LMHeadModel, GPT2Tokenizer

class CarBotModel:
    def __init__(self, model_dir=None):
        base = model_dir if model_dir else "distilgpt2"
        self.tokenizer = GPT2Tokenizer.from_pretrained(base)
        self.model = GPT2LMHeadModel.from_pretrained(base)

    def save(self, output_dir):
        self.model.save_pretrained(output_dir)
        self.tokenizer.save_pretrained(output_dir)

    def load(self, model_dir):
        self.model = GPT2LMHeadModel.from_pretrained(model_dir)
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_dir)

    def generate(self, text):
        tokens = self.tokenizer(text, return_tensors="pt")
        output = self.model.generate(
            **tokens,
            max_length=100,
            temperature=0.7,
            do_sample=True
        )
        return self.tokenizer.decode(output[0], skip_special_tokens=True)

