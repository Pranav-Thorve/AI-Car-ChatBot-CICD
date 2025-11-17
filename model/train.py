from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments
from datasets import Dataset

def load_dataset():
    with open("data.txt", "r") as f:
        lines = f.read().split("\n")
    return [{"text": l} for l in lines if l.strip()]

def tokenize(batch):
    tokens = tokenizer(
        batch["text"],
        truncation=True,
        padding="max_length",
        max_length=128,
    )
    # Required for Trainer to compute loss
    tokens["labels"] = tokens["input_ids"].copy()
    return tokens

if __name__ == "__main__":
    tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")
    tokenizer.pad_token = tokenizer.eos_token

    data = load_dataset()
    dataset = Dataset.from_list(data)
    dataset = dataset.map(tokenize, batched=True)

    model = GPT2LMHeadModel.from_pretrained("distilgpt2")
    model.resize_token_embeddings(len(tokenizer))

    # REMOVED: evaluation_strategy
    args = TrainingArguments(
        output_dir="./weights",
        per_device_train_batch_size=2,
        num_train_epochs=3,
        logging_steps=10,
        save_steps=50,
        report_to="none"    
    )

    trainer = Trainer(
        model=model,
        args=args,
        train_dataset=dataset,
    )

    trainer.train()

    model.save_pretrained("./weights")
    tokenizer.save_pretrained("./weights")

    print("Training finished — saved to ./weights")

