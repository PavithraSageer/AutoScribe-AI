# Approach Document – AutoScribe AI

## 1. Overview
AutoScribe AI is designed to reduce creative burnout by automating the process of generating structured content from raw text or documents. Instead of manually extracting information and rewriting content across formats, users can input text or upload a PDF and receive high-quality, ready-to-use outputs.

The system uses a multi-agent architecture to divide the workflow into smaller, specialized tasks, improving both efficiency and reliability.

---

## 2. Solution Design

The application follows a sequential pipeline:

1. **Input Processing**
   - Users upload a PDF or enter raw text
   - PDF content is extracted using PyMuPDF and cleaned for processing

2. **Fact Extraction (Nova)**
   - Identifies and extracts key facts from the input
   - Ensures that all generated content is grounded in the source

3. **Content Generation (Echo)**
   - Uses extracted facts to generate multiple content formats such as blogs, emails, and social media posts

4. **Content Review (Aegis)**
   - Evaluates the generated content for quality and consistency
   - Provides feedback and refines the output if necessary

5. **Final Output**
   - Returns structured, reviewed content to the user
   - Displays agent interactions and results in the frontend

This modular pipeline ensures clear separation of responsibilities and improves maintainability.

---

## 3. Tech Stack and Justification

- **Python (Backend Language):** Chosen for its strong support for AI/ML integration and simplicity in building APIs  
- **FastAPI:** Provides high performance, asynchronous handling, and easy API development  
- **React (Vite):** Enables fast, responsive UI development with a modern developer experience  
- **Tailwind CSS:** Simplifies styling and allows rapid UI design  
- **OpenRouter (Mistral Model):** Used for efficient and cost-effective language model access  
- **PyMuPDF:** Enables accurate extraction of text from PDF files  

The stack was selected to balance **performance, scalability, and ease of development**.

---

## 4. Key Design Decisions

- **Multi-Agent Architecture:** Separates fact extraction, content generation, and validation for better reliability  
- **Fact-First Approach:** Reduces hallucination by grounding outputs in extracted facts  
- **Iterative Review Mechanism:** Improves output quality through feedback loops  
- **Modular Backend Design:** Allows easy updates or replacement of individual agents  

---

## 5. Challenges Faced

- Managing slow response times from external AI APIs  
- Ensuring structured and consistent outputs from language models  
- Coordinating communication between multiple agents  
- Handling different input types (PDF and raw text)

---

## 6. Future Improvements

- Real-time streaming of agent responses for better user experience  
- Faster model integration to reduce response time  
- Enhanced UI for visualizing agent interactions  
- Support for additional content formats and customization options  

---

## 7. Conclusion

AutoScribe AI provides a structured and efficient approach to content generation by combining automation with validation. By addressing creative burnout and ensuring reliable outputs, the system improves both productivity and content quality.
