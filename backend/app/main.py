from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import upload
from app.routers import summarize
from app.routers import chat
from app.routers import history
from dotenv import load_dotenv


load_dotenv()
app = FastAPI()

origins = ["http://localhost:3000", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(summarize.router)
app.include_router(chat.router)
app.include_router(history.router)