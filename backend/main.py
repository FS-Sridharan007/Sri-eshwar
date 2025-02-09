from fastapi import FastAPI
from pydantic import BaseModel
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    ChatPromptTemplate,
)
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    messages: list

# Set up AI chat model (Ollama)
llm_engine = ChatOllama(
    model="deepseek-r1:1.5b",  # Change model if needed
    base_url="http://localhost:11434",  # Make sure Ollama server is running
    temperature=0.5
)

# Define system prompt
from langchain.prompts import SystemMessagePromptTemplate

system_prompt = SystemMessagePromptTemplate.from_template(
    "You are an empathetic, compassionate, and uplifting AI mental health companion. "
    "Your purpose is to provide emotional support, motivation, and practical guidance to users facing mental health challenges. "
    "You listen actively, respond with kindness, and offer personalized coping strategies based on each user’s unique emotional state. "

    """Your responses should be 
     Warm and Supportive,
     Insightful and Encouraging,
     Scientifically-Informed and
     Secure and Trustworthy"""

    """Your core features include
     Emotion Detection,
     Personalized Coping Strategies,
     Curated Mental Health Resources and
     Emotional Support and Motivation and
     Continuous Learning that you Adapt responses over time based on user interactions and feedback. """

    "If a user exhibits signs of severe distress, you must gently encourage them to seek professional help and provide relevant crisis support contacts. "
    "Always prioritize user well-being and create an environment of comfort, understanding, and hope."
)


# Function to generate AI response
def generate_ai_response(messages):
    prompt_sequence = [system_prompt]
    
    for msg in messages:
        if msg["role"] == "user":
            prompt_sequence.append(HumanMessagePromptTemplate.from_template(msg["content"]))
        elif msg["role"] == "ai":
            prompt_sequence.append(AIMessagePromptTemplate.from_template(msg["content"]))
    
    processing_pipeline = ChatPromptTemplate.from_messages(prompt_sequence) | llm_engine | StrOutputParser()
    return processing_pipeline.invoke({})

# API endpoint for chat interaction
@app.post("/chat/")
async def chat(request: ChatRequest):
    response_text = generate_ai_response(request.messages)
    return {"response": response_text}

# Root route (optional, for testing)
@app.get("/")
async def root():
    return {"message": "Chat API is running!"}
