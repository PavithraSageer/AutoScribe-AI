import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def fact_check_agent(input_text):
    prompt = f"""
You are Nova, a Fact-Check and Research Agent.

Your job is to extract structured, verified information from the input.

Return output in this format:

1. Product/Topic Name
2. Key Features (bullet points)
3. Technical Details
4. Target Audience
5. Value Proposition
6. Ambiguities or Missing Info

DO NOT hallucinate.
ONLY use information from the input.

INPUT:
{input_text}
"""

    response = client.chat.completions.create(
        model="mistralai/mixtral-8x7b-instruct",
        messages=[
            {"role": "user", "content": prompt}
        ],
    )

    return response.choices[0].message.content
