from fastapi import APIRouter, File, UploadFile
from app.services.document_parser import parse_pdf_document


router = APIRouter()

@router.post("/upload")
async def handle_upload(file: UploadFile = File(...)):
    content = await file.read()
    chunks = parse_pdf_document(content, file.filename)
    return {"status": "success", "result": "No of pages processed: "+str(len(chunks))}

