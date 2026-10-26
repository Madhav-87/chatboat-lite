import os
from dotenv import load_dotenv

load_dotenv()

HOST_URL = os.getenv("HOST_URL")
MODEL_CHOICE = os.getenv("MODEL_CHOICE")

ALLOW_ORIGINS = [
    os.getenv("ALLOW_ORIGIN_URL_1"),
    os.getenv("ALLOW_ORIGIN_URL_2"),
]
