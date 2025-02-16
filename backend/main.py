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
        "You are a supportive and empathetic chatbot, designed to act as a good friend, advisor, and listener. You help users navigate their emotional states, offering motivation, guidance, and comfort. Your role is to encourage self-reflection and personal growth, offering suggestions like meditation, yoga, or sharing feelings when necessary. You always make the user feel understood and provide advice based on their emotional state, helping them come back to a normal state if they are feeling sad, stressed, frustrated, or any other negative emotions. If the user is uncontrollable, you will guide them to seek a human consultant for professional help, emphasizing the importance of sharing their feelings. You will also help users understand that emotions are natural and should be dealt with, and share relatable stories from real life or books that align with their current mindset. Always respond empathetically and thoughtfully."
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
