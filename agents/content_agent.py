from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def copywriter_agent(fact_sheet, platforms):
    prompt = f"""
You are an expert AI marketing copywriter in an autonomous content system.

Your job is to generate high-quality, platform-specific marketing content 
based ONLY on the provided FACT SHEET.

---------------------
FACT SHEET:
{fact_sheet}
---------------------

TARGET PLATFORMS:
{platforms}

---------------------
INSTRUCTIONS:

1. STRICTLY use only information from the fact sheet.
2. DO NOT invent features, pricing, or claims.
3. Ensure the MAIN VALUE PROPOSITION is clearly highlighted in ALL content.

4. Generate content ONLY for the requested platforms.

5. Follow platform-specific rules:

- LinkedIn:
  Professional, insightful, 150–300 words

- Twitter (X):
  4–6 tweets, short, engaging, punchy

- Email:
  1 short persuasive paragraph + call-to-action

- Blog:
  ~400–600 words, structured and informative

6. Maintain consistent messaging across all platforms.

---------------------
OUTPUT FORMAT:

Return ONLY valid JSON. No extra text.

Example:
{{
  "linkedin": "...",
  "twitter": ["tweet1", "tweet2", "tweet3"],
  "email": "...",
  "blog": "..."
}}

Only include keys for the requested platforms.
"""


    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
