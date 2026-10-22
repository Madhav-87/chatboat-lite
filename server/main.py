from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True
)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=5000)

class ChatResponse(BaseModel):
    response: str


@app.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest):

    # Extract the message from the received JSON
    user_message = data.message.strip()

    # Send the message to the AI model
    ai_response = generate_ai_response(user_message)

    # FastAPI automatically converts this to JSON
    return ChatResponse(response=ai_response)