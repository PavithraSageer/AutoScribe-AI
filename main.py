import os
import re
import json
import uuid
import fitz 
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.concurrency import run_in_threadpool

from faact import fact_check_agent
from contentt import copywriter_agent

app = FastAPI()

def clean_text(text: str) -> str:
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def parse_llm_json(raw_content: str):
    """Safely extracts and parses JSON even if wrapped in markdown blocks."""
    try:
        # Remove markdown code blocks if present
        cleaned = re.sub(r"```json|```", "", raw_content).strip()
        return json.loads(cleaned)
    except Exception:
        return {"error": "Invalid JSON format", "raw_output": raw_content}

def extract_pdf_text(stream: bytes) -> str:
    """Extracts text from a byte stream using PyMuPDF."""
    with fitz.open(stream=stream, filetype="pdf") as doc:
        return "".join(page.get_text() for page in doc)

@app.post("/process")
async def process_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        content = await file.read()
        
        text = await run_in_threadpool(extract_pdf_text, content)
        
        if not text.strip():
            return {"error": "No text extracted or PDF is image-based (OCR required)"}

        cleaned_text = clean_text(text)

        fact_result = await run_in_threadpool(fact_check_agent, cleaned_text)

        platforms = ["linkedin", "twitter", "email"]
        raw_content = await run_in_threadpool(copywriter_agent, fact_result, platforms)

        content_result = parse_llm_json(raw_content)

        return {
            "status": "success",
            "facts": fact_result,
            "content": content_result
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}
