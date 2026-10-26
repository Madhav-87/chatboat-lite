from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse
from config import ALLOW_ORIGINS
from services.ai_service import generate_ai_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
    allow_credentials=True
)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=5000)

class ChatResponse(BaseModel):
    message:str


@app.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest):

    # Extract the message from the received JSON
    user_message = data.message.strip()

    # Send the message to the AI model
    ai_response = generate_ai_response(user_message)

    # converts this to JSON
    return ChatResponse(message=ai_response)


@app.exception_handler(HTTPException)
async def http_exception_handler(
    request: Request,
    exc: HTTPException
):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
