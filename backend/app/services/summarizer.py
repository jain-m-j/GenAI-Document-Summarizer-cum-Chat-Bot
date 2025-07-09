import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def generate_summary(document_content):
    model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
    prompt = f"""Summarize the following document concisely and accurately. Document: {document_content}"""

    response = model.generate_content(prompt)
    return response.text.strip()