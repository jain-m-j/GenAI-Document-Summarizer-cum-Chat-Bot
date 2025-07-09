from fastapi import APIRouter
from app.services.memory_cache import get_chat_history


router = APIRouter()

@router.get("/history")
async def get_history():
    response = get_chat_history()
    return {"status": "success", "result": response}

