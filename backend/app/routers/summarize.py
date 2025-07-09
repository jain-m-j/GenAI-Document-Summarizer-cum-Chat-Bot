from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.summarizer import generate_summary
from app.services.document_parser import documents

router = APIRouter()

class SummarizeRequest(BaseModel):
    filename: str

@router.post("/summarize/")
async def summarize_document(request: SummarizeRequest):
    if request.filename not in documents:
        raise HTTPException(status_code=404, detail="Document not found.")

    document_content_to_summarize = "\n".join(documents[request.filename])

    try:
        summary = generate_summary(document_content_to_summarize)
        return {"filename": request.filename, "summary": summary}
    except Exception as e:
        print(f"Error during summarization for {request.filename}: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating summary: {e}")