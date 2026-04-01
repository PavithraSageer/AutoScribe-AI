# AutoScribe AI

## Overview
Autoscribe AI is a two agent system that automates content repurposing. It converts a single input into multiple platform specific outputs while maintaining consistency and accuracy.

## Architecure
-**Fact Check Agent** : Extracts structured information (Fact_sheet)

-**Content Agent** : Generates blog, social media thread and email

## Features
-Structured Fact_sheet generation

-Multi platform content creation

-Consistent tone across outputs

## Tech Stack (till now)
-FastAPI

-Python

## How to Run
```bash
pip install -r requirements.txt
uvicorn main:app --reload
