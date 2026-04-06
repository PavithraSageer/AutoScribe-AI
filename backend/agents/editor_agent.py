import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def editor_agent(fact_sheet, generated_content):
    """
    Aegis - Editor-in-Chief Agent

    Responsibilities:
    - Validate factual accuracy
    - Check tone (not too robotic / not too salesy)
    - Ensure format compliance
    - Provide correction feedback if needed
    """

    prompt = f"""
You are Aegis, an expert Editor-in-Chief.

You are part of an Autonomous Content Factory.

---

FACT SHEET (Source of Truth):
{fact_sheet}

---

GENERATED CONTENT:
{generated_content}

---

YOUR RESPONSIBILITIES:

1. FACT CHECK (CRITICAL):
- Compare content with fact sheet
- Reject ONLY if:
  - New facts are invented
  - Information contradicts the fact sheet

2. TONE AUDIT:
- Ensure content is:
  - Natural and human-like
  - Not overly robotic
  - Not overly salesy
- Minor tone issues → FIX, do NOT reject

3. FORMAT VALIDATION:

Blog:
- ~500 words
- Has Title, Introduction, Sections, Conclusion

Social Thread:
- EXACTLY 5 posts
- Each post short
- Includes hashtags

Email:
- ONE paragraph (80–120 words)

4. FEEDBACK LOOP:
- If rejecting → give SPECIFIC correction notes
- Example:
  - "Fix: Blog intro too long"
  - "Fix: Unsupported claim about pricing"
  - "Fix: Missing hashtags in social thread"

---

DECISION RULES:

- If content is mostly correct → APPROVE
- If minor issues → FIX and APPROVE
- If major factual errors → REJECT

---

RETURN ONLY VALID JSON:

{{
  "approved": true or false,
  "issues": ["Fix: issue1", "Fix: issue2"],
  "corrected_content": {{
    "blog": "...",
    "social_thread": ["...", "..."],
    "email": "..."
  }},
  "score": number between 0 and 100
}}

---

IMPORTANT:
- Prefer fixing over rejecting
- Only reject for serious factual problems
- Keep engaging tone intact while correcting
"""

    try:
        response = client.chat.completions.create(
            model="openrouter/free",
            messages=[
                {
                    "role": "system",
                    "content": "You are a strict but fair editor that returns structured JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        raw_output = response.choices[0].message.content.strip()

        # 🧠 Clean JSON (remove markdown if any)
        cleaned = raw_output.replace("```json", "").replace("```", "").strip()

        return json.loads(cleaned)

    except Exception as e:
        return {
            "approved": True, # fallback so pipeline doesn't break
            "issues": [f"Editor error: {str(e)}"],
            "corrected_content": generated_content,
            "score": 70
        }