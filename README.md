AI Companion Chatbot
This project builds an AI-powered chatbot designed to interact with users in a supportive, empathetic, and uplifting manner. It provides emotional support, motivation, and personalized coping strategies for individuals facing mental health challenges. The chatbot detects user emotions, adapts responses over time, and encourages professional help when needed.

Features
✅ Speech-to-Text (STT): Converts spoken input into text for chatbot communication.
✅ Text-to-Speech (TTS): Converts chatbot's text responses into speech.
✅ Mute/Unmute Option: Users can mute or unmute the chatbot’s speech.
✅ AI-Driven Responses: Uses Ollama’s deepseek-r1:1.5b model to generate emotionally intelligent and scientifically informed responses.
✅ User Interface: Built with React.js & Tailwind CSS, ensuring a clean and user-friendly experience.
✅ Emotion Detection & Coping Strategies: Adapts responses based on user interactions.
✅ Secure & Trustworthy: Prioritizes user well-being and ensures privacy.

Tech Stack
Backend:
FastAPI (Python): Serves as the core backend framework.
LangChain + Ollama: Handles AI-driven conversational responses.
MongoDB: Stores chat history and user preferences.
Frontend:
React.js: Provides an interactive UI.
Tailwind CSS: Ensures a sleek and modern design.
Framer Motion: Adds smooth animations for better user engagement.
Setup Instructions
Prerequisites
✔ Node.js and npm for the frontend.
✔ Python for running the FastAPI server.
✔ MongoDB (locally or via a cloud service).
✔ Ollama installed and running locally.

Commands to Run the AI Companion Chatbot
1️⃣ Frontend Setup
cd ai
npm install
npm install vite --save-dev
npm run dev
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
3️⃣ Start MongoDB (If Running Locally)
mongod --dbpath <your_db_path>
4️⃣ Run Ollama Model
ollama run deepseek-r1:1.5b
(or)
ollama serve
5️⃣ Start FastAPI Server
cd backend
uvicorn main:app --reload
