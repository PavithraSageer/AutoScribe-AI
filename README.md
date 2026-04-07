# AutoScribe AI

## Project Title
AutoScribe AI - Multi Agent Content Generation System

---

## The Problem
Content creators and students often experience creative burnout when repeatedly generating ideas and rewriting content across formats.
This mental fatigue, combined with the need to ensure accuracy and originality, makes the process slow, stressful and inconsistent.

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
### 1. Backend Setup
The backend is deployed on Render and can be accessed here : https://autoscribe-ai-1-qlub.onrender.com

**Note :** The server may take a few seconds to respond initially due to cold start.
### 2. Clone the Repository
```bash
git clone https://github.com/PavithraSageer/AutoScribe-AI.git
cd AutoScribe-AI
```
### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---
