import google.generativeai as genai
import os
from .embedding_service import embed_text_chunks
from .document_parser import documents
from .memory_cache import save_chat_history

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def get_chat_response(user_input):
    model = genai.GenerativeModel('models/gemini-1.5-flash-latest')

    all_text = "\n".join([page for pages_list in documents.values() for page in pages_list])

    context = all_text[:7000]

    prompt_messages = [
        {"role": "user", "parts": [
            f"You are a helpful AI assistant. Answer the question using the provided document context. If the answer is not in the document, state that you cannot find it.\n\nDocument: {context}\n\nQuestion: {user_input}"]},
    ]

    response = model.generate_content(prompt_messages)
    answer = response.text.strip()
    save_chat_history(user_input, answer)
    return answer