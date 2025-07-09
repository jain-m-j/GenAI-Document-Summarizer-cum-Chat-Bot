import fitz


documents = {}
def parse_pdf_document(content, filename):
    doc = fitz.open(stream=content, filetype="pdf")
    text_chunks = []
    for page in doc:
        text = page.get_text()
        text_chunks.append(text)
    documents[filename] = text_chunks
    return text_chunks
