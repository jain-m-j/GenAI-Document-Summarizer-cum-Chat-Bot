from fastapi import APIRouter, Body
from app.services.rag_chain import get_chat_response

router = APIRouter()

@router.post("/chat")
def chat_with_doc(message: dict = Body(...)):
    user_input = message["query"]
    response = get_chat_response(user_input)
    return {"response": response}