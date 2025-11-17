from model import CarBotModel

# Load trained weights
model = CarBotModel("weights")

print("Model loaded. Type a car name to test.\n")

while True:
    user_input = input("Ask: ").strip()
    if user_input == "":
        continue
    print("\nAnswer:", model.generate(user_input))
    print()

