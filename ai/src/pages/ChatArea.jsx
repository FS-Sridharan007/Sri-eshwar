import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import STTButton from "./STTButton";
import TTSButton from "./TTSButton";
import { Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);
  const utteranceRef = useRef(null);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) return;

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/chat/${userEmail}`);
        if (response.data.messages?.length > 0) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [userEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentBotMessage]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
  
    const userMessage = { text: trimmedInput, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);
  
    try {
      await axios.post("http://localhost:8000/chat/send", {
        email: userEmail,
        text: trimmedInput,
        type: "user",
      });
  
      const response = await axios.post("http://localhost:7000/chat/", {
        messages: [{ role: "user", content: trimmedInput }],
      });
  
      let botResponse = response.data.response || "I'm here to help!";
      
      // Extract the actual response, removing <think>...</think>
      const cleanedResponse = botResponse.replace(/<think>[\s\S]*?<\/think>\n*/, "").trim();
  
      // Save bot response to chat history
      await axios.post("http://localhost:8000/chat/send", {
        email: userEmail,
        text: cleanedResponse,
        type: "bot",
      });
  
      simulateTyping(cleanedResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      simulateTyping("Oops! Something went wrong. Please try again.");
    }
  };
  
  const simulateTyping = (fullText) => {
    setCurrentBotMessage("");
    stopSpeech();
    setBotTyping(true);
  
    if (!isMuted) {
      speakText(fullText);
    }
  
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setCurrentBotMessage((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { text: fullText, type: "bot" }]);
        setCurrentBotMessage("");
        setBotTyping(false);
      }
    }, 50);
  };
  
  

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.2;
    utterance.pitch = 1;
    utterance.volume = 1;

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const cleanBotMessage = (message) => {
    return message.replace(/<think>[\s\S]*?<\/think>\n*/, "").trim();
  };
  
  {messages.map((msg, index) => (
    <motion.div
      key={index}
      className={`p-3 rounded-lg max-w-xs transition-all duration-300 ${
        msg.type === "user"
          ? "bg-[#00ADB5] self-end text-white ml-auto"
          : "bg-[#F8B400] self-start text-black mr-auto"
      }`}
    >
      {msg.type === "user" ? msg.text : cleanBotMessage(msg.text)}
      {msg.type === "bot" && !isMuted && <TTSButton text={cleanBotMessage(msg.text)} />}
    </motion.div>
  ))}

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login", { replace: true });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-[#222831] to-[#393E46] text-white relative"
    >
      <motion.h1 className="absolute top-5 left-6 text-2xl font-bold text-[#00ADB5]">
        ChatBot
      </motion.h1>

      {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="absolute top-5 right-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
            Logout
        </motion.button>

      <motion.div className="w-[75%] h-[75vh] flex flex-col bg-[#EEEEEE]/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
        {messages.length === 0 && (
          <motion.h2 className="text-center text-lg text-gray-300 mb-2">
            💬 Let&apos;s chat! I&apos;m here to assist you. 🚀
          </motion.h2>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg max-w-xs transition-all duration-300 ${
                msg.type === "user"
                  ? "bg-[#00ADB5] self-end text-white ml-auto"
                  : "bg-[#F8B400] self-start text-black mr-auto"
              }`}
            >
              {msg.text}
              {msg.type === "bot" && !isMuted && <TTSButton text={msg.text} />}
            </motion.div>
          ))}

          {botTyping && <p className="text-gray-400 text-sm">ChatBot is typing...</p>}
          {currentBotMessage && (
            <p className="p-3 rounded-lg bg-[#F8B400] self-start text-black">
              {currentBotMessage}
            </p>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center bg-[#222831]/50 p-3 rounded-lg mt-4">
          <STTButton onResult={(transcript) => setInput((prev) => prev + " " + transcript)} />
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none p-2 border-b border-gray-600"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <motion.button
            className="mx-3 p-2 rounded-full bg-gray-600 hover:bg-gray-500"
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? "Unmute bot voice" : "Mute bot voice"}
          >
            {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400" />}
          </motion.button>

          <motion.button
            className={`bg-[#0077FF] px-4 py-2 rounded-lg ${
              input.trim() ? "hover:bg-[#005BBB]" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
