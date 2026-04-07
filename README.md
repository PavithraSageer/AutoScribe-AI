# AutoScribe AI

## Project Title
AutoScribe AI - Multi Agent Content Generation System

---

## The Problem
Creating high quality content from raw documents is time consuming when done manually. Repetitive corrections and editing leads to creative burnout.
Using general LLMs lead to inaccurate or hallucinated information. Also existing tools either lack proper fact checking or require multiple disconnected steps.

## The Solution
AutoScribe AI solves this problem using a structured multi-agent pipeline that transforms raw text or PDFs into reliable, high quality content.
- **Nova (Fact Agent) :** Extracts and verifies key facts from input to generate a fact sheet
- **Echo (Copywriter Agent) :** Generates blogs, emails, and social media content from the fact sheet
- **Aegis (Editor Agent) :** Reviews, scores, and refines the generated content
This approach ensures content is **fact-grounded, consistent, and easy to generate**.

---

## Tech Stack
### Programming Languages
- Python
- JavaScript/ TypeScript

### Frameworks and Libraries
- FastAPI (Backend)
- React + Vite (Frontend)
- Tailwind CSS

### Tools and APIs
- OpenRouter API (Mistral model)
- PyMuPDF (PDF text extraction)
- Axios/Fetch (API calls)
- Render (Backend hosting)

---

## Setup Instructions
### 1. Setup Backend
Backend is hosted using Render. The following URL leads to live backend.

Note : 
### 1. Clone the Repository
```bash
git clone https://github.com/PavithraSageer/AutoScribe-AI.git
cd AutoScribe-AI
```
