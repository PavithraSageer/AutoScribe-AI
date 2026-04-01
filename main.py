from fastapi import FastAPI
from agents.fact_agent import generate_fact_sheet
from agents.content_agent import generate_content

app = FastAPI(title="AutoScribe AI")

@app.get("/")
def home():
    return {"message": "AutoScribe AI is running 🚀"}

@app.post("/process")
def process_input(data: dict):
    text = data.get("text")

    fact_sheet = generate_fact_sheet(text)
    content = generate_content(fact_sheet)

    return {
        "fact_sheet": fact_sheet,
        "content": content
    }
