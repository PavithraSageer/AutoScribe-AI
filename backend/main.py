from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz # PyMuPDF
import uuid
import os

# Import agents
from agents.fact_agent import fact_check_agent
from agents.copywriter_agent import copywriter_agent
from agents.editor_agent import editor_agent


app = FastAPI()

# ✅ CORS (IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # You can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request model (for text input)
# -----------------------------
class TextRequest(BaseModel):
    text: str


# -----------------------------
# Utility: Extract text from PDF
# -----------------------------
def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text


# -----------------------------
# MAIN ENDPOINT
# -----------------------------
@app.post("/autoscribe")
async def autoscribe(
    file: UploadFile = File(None),
    text: str = Form(None)
):
    chat_log = []

    # -----------------------------
    # STEP 1: GET INPUT TEXT
    # -----------------------------
    if file:
        try:
            temp_filename = f"temp_{uuid.uuid4()}.pdf"

            with open(temp_filename, "wb") as buffer:
                buffer.write(await file.read())

            chat_log.append({"agent": "Nova 🧠", "message": "I've begun extracting content from the document..."})

            extracted_text = extract_text_from_pdf(temp_filename)

            os.remove(temp_filename)

            chat_log.append({"agent": "Nova 🧠", "message": "Extraction complete. Creating fact sheet..."})

        except Exception as e:
            return {"error": f"Failed to process file: {str(e)}"}

    elif text:
        extracted_text = text
        chat_log.append({"agent": "Nova 🧠", "message": "Processing provided text input..."})

    else:
        return {"error": "No input provided. Upload a file or provide text."}

    # -----------------------------
    # STEP 2: FACT AGENT
    # -----------------------------
    fact_sheet = fact_check_agent(extracted_text)

    chat_log.append({"agent": "Nova 🧠", "message": "Fact sheet ready. Passing to Copywriter..."})

    # -----------------------------
    # STEP 3: CONTENT AGENT
    # -----------------------------
    content = copywriter_agent(fact_sheet)

    chat_log.append({"agent": "Echo ✍️", "message": "Content generated. Sending to Editor..."})

    # -----------------------------
    # STEP 4: EDITOR LOOP
    # -----------------------------
    max_retries = 3
    attempt = 0
    approved = False
    feedback = None

    while attempt < max_retries:
        review = editor_agent(fact_sheet, content)

        if review["approved"]:
            approved = True
            chat_log.append({"agent": "Aegis 🛡️", "message": "Content approved. Ready to deliver!"})
            break
        else:
            feedback = review["feedback"]

            chat_log.append({
                "agent": "Aegis 🛡️",
                "message": f"Content needs revision:\n{feedback}"
            })

            chat_log.append({"agent": "Echo ✍️", "message": "Reworking content based on feedback..."})

            content = copywriter_agent(fact_sheet, feedback)

            attempt += 1

    # -----------------------------
    # FAILSAFE APPROVAL
    # -----------------------------
    if not approved:
        chat_log.append({
            "agent": "Aegis 🛡️",
            "message": "Maximum revisions reached. Approving content."
        })

    # -----------------------------
    # FINAL RESPONSE
    # -----------------------------
    return {
        "fact_sheet": fact_sheet,
        "chat_log": chat_log,
        "final_outputs": content
    }
