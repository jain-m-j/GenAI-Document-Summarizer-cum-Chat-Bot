from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os

embedding_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=os.getenv("GOOGLE_API_KEY"))

def embed_text_chunks(chunks):
    return embedding_model.embed_documents(chunks)