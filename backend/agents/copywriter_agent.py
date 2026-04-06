import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def copywriter_agent(fact_sheet, platforms, feedback=None):
    """
    Echo - Creative Copywriter Agent

    Generates:
    - Blog (~500 words)
    - Social media thread (5 posts)
    - Email teaser (1 paragraph)

    Can also revise based on editor feedback.
    """

    prompt = f"""
You are Echo, a highly skilled AI marketing copywriter.

You are part of an Autonomous Content Factory.

---

FACT SHEET (Single Source of Truth):
{fact_sheet}

---

YOUR TASK:
Generate high-quality marketing content based ONLY on the fact sheet.

---

CRITICAL RULES:
- DO NOT invent or assume any facts
- ONLY use information present in the fact sheet
- The MAIN VALUE PROPOSITION must be the core focus in ALL outputs
- Content must feel natural, engaging, and human-like

---

OUTPUT REQUIREMENTS:

1. Blog Post:
- Around 500 words
- Must include:
  - Title
  - Introduction
  - 2–3 sections with headings
  - Conclusion
- Tone: Professional, trustworthy, informative
- Well-structured with paragraphs (NOT one block)

---

2. Social Media Thread (Twitter/X):
- EXACTLY 5 posts
- Each post must:
  - Be short and punchy
  - Continue logically as a thread
  - Include 2–3 relevant hashtags
- No long paragraphs

---

3. Email Teaser:
- ONE paragraph only (80–120 words)
- Clear, persuasive, and engaging
- Should encourage the reader to learn more

---

"""

    if feedback:
        prompt += f"""
EDITOR CORRECTION NOTES:
{feedback}

Revise the content accordingly:
- Fix ALL mentioned issues
- Do NOT repeat mistakes
- Improve clarity, tone, and accuracy
- Keep content engaging while correcting errors
"""

    prompt += f"""
---

Generate content ONLY for these platforms:
{platforms}

---

RETURN FORMAT (STRICT):

Return ONLY valid JSON. No explanations.

Example format:

{{
  "blog": "...",
  "social_thread": [
    "post1",
    "post2",
    "post3",
    "post4",
    "post5"
  ],
  "email": "..."
}}

Rules:
- Include ONLY requested platforms
- Social thread MUST have exactly 5 posts
- No extra text outside JSON
"""

    try:
        response = client.chat.completions.create(
            model="openrouter/free",
            messages=[
                {
                    "role": "system",
                    "content": "You are a precise marketing copywriter that strictly returns JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f'{{"error": "Copywriter failed: {str(e)}"}}'