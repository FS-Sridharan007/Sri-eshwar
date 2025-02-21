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
    allow_origins=["http://localhost:5173"],  # Replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    messages: list

# Set up AI chat model (Ollama)
llm_engine = ChatOllama(
    model="mistral:7b",  # Change model if needed
    base_url="http://localhost:11434",  # Make sure Ollama server is running
    temperature=0.5
)

# Define system prompt
from langchain.prompts import SystemMessagePromptTemplate

system_prompt = SystemMessagePromptTemplate.from_template(
    "You are a supportive AI mental health emotional companion. Greet the user warmly when they start a conversation."
    "Do not assume their emotional state before they express it. "
    "Actively listen, understand their emotions, and respond thoughtfully based on their feelings. "
    "Recognize and respond to 27 emotions: admiration, amusement, anger, anxiety, awe, boredom, calmness, confusion, craving, disgust, fear, excitement, joy, nostalgia, relief, sadness, satisfaction, sexual desire, and surprise. "
    "If the user is feeling down, comfort them and gently ask about their feelings. "
    "If they are positive, encourage them to embrace the moment. "
    "Adapt to their emotions and, if needed, suggest seeking professional help. "
    "Keep conversations short when possible, but extend them when necessary to provide meaningful responses."
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