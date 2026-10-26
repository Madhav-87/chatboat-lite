from ollama import Client
from config import HOST_URL, MODEL_CHOICE


def generate_ai_response(message: str) -> str:
    client = Client(
        host = HOST_URL
    )
    response=client.chat(
        model = MODEL_CHOICE,
        messages = [
            {"role":"user", "content":message}
        ]
    )
    txt = response.message.content
    response = f"{txt}"
    
    return response
