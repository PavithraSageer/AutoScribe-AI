import os
import re
import json
import fitz
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.concurrency import run_in_threadpool
from dotenv import load_dotenv

load_dotenv()

from agents.fact_agent import fact_check_agent
from agents.copywriter_agent import copywriter_agent
from agents.editor_agent import editor_agent

app = FastAPI()


def clean_text(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()


def extract_pdf_text(stream: bytes) -> str:
    with fitz.open(stream=stream, filetype="pdf") as doc:
        return "".join(page.get_text() for page in doc)


def parse_json(raw: str):
    try:
        cleaned = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(cleaned)
    except:
        return {"error": "Invalid JSON", "raw": raw}


@app.post("/autoscribe")
async def autoscribe(
    file: UploadFile = File(None),
    text_input: str = Form(None)
):

    chat_log = []

    if not file and not text_input:
        raise HTTPException(status_code=400, detail="Provide a PDF file or text input")

    try:
        chat_log.append({
            "agent": "Nova",
            "message": "Reading input...",
            "status": "thinking"
        })

        if file:
            if file.content_type != "application/pdf":
                raise HTTPException(status_code=400, detail="File must be a PDF")

            content = await file.read()
            text = await run_in_threadpool(extract_pdf_text, content)

        else:
            text = text_input

        if not text or not text.strip():
            return {"error": "No usable text provided"}

        cleaned_text = clean_text(text)

        chat_log.append({
            "agent": "Nova",
            "message": "Extraction complete. Creating fact sheet...",
            "status": "done"
        })

        fact_result = await run_in_threadpool(fact_check_agent, cleaned_text)

        chat_log.append({
            "agent": "Nova",
            "message": "Fact sheet ready. Passing to Echo...",
            "status": "done"
        })

        chat_log.append({
            "agent": "Echo",
            "message": "Generating content...",
            "status": "typing"
        })

        raw_content = await run_in_threadpool(
            copywriter_agent,
            fact_result,
            ["blog", "social_thread", "email"]
        )

        content_json = parse_json(raw_content)

        chat_log.append({
            "agent": "Echo",
            "message": "Content generated. Passing to Aegis...",
            "status": "done"
        })

        max_retries = 2

        for attempt in range(max_retries + 1):

            chat_log.append({
                "agent": "Aegis",
                "message": "Reviewing content...",
                "status": "thinking"
            })

            editor_result = await run_in_threadpool(
                editor_agent,
                fact_result,
                content_json
            )

            approved = editor_result.get("approved", True)
            score = editor_result.get("score", 80)

            if approved or score >= 75:
                chat_log.append({
                    "agent": "Aegis",
                    "message": "Content approved ✅",
                    "status": "done"
                })

                final_content = editor_result.get("corrected_content", content_json)
                break

            issues = editor_result.get("issues", [])

            chat_log.append({
                "agent": "Aegis",
                "message": f"Needs revision: {issues}",
                "status": "warning"
            })

            chat_log.append({
                "agent": "Echo",
                "message": "Rewriting content based on feedback...",
                "status": "typing"
            })

            raw_content = await run_in_threadpool(
                copywriter_agent,
                fact_result,
                ["blog", "social_thread", "email"],
                issues
            )

            content_json = parse_json(raw_content)

        else:
            chat_log.append({
                "agent": "Aegis",
                "message": "Max retries reached. Approving best version.",
                "status": "warning"
            })

            final_content = content_json

        return {
            "status": "success",
            "chat": chat_log,
            "fact_sheet": fact_result,
            "final_content": final_content
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
