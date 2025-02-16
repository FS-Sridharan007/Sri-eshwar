import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import STTButton from "./STTButton";
import TTSButton from "./TTSButton";
import { Volume2, VolumeX } from "lucide-react"; // Import mute/unmute icons

export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false); // State for mute/unmute
  const messagesEndRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentBotMessage]);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, type: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setBotTyping(true);

      try {
        const response = await axios.post("http://localhost:8000/chat/", {
          messages: [
            ...messages.map((msg) => ({
              role: msg.type === "user" ? "user" : "ai",
              content: msg.text,
            })),
            { role: "user", content: input },
          ],
        });

        const aiResponse = response.data.response;
        simulateTyping(aiResponse);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        simulateTyping("Oops! Something went wrong. But don't worry, I'm still here for you. 💙");
      }
    }
  };

  const simulateTyping = (fullText) => {
    let index = 0;
    setCurrentBotMessage("");

    if (!isMuted) {
      speakText(fullText);
    }

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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utteranceRef.current = utterance;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-[#222831] to-[#393E46] text-white relative"
    >
      <motion.h1 className="absolute top-5 left-6 text-2xl font-bold text-[#00ADB5] tracking-wide drop-shadow-lg">
        Your AI Companion 
      </motion.h1>

      <motion.div className="w-[75%] h-[75vh] flex flex-col bg-[#EEEEEE]/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-700">
        <motion.h2 className="text-center text-lg text-gray-300 mb-2">
          💬 I'm here to listen, support, and be your friend.
        </motion.h2>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">
              You can share anything with me. I'm always here for you. 
            </p>
          )}

          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg max-w-xs transition-all duration-300 ${
                msg.type === "user" ? "bg-[#00ADB5] self-end text-white" : "bg-[#F8B400] self-start text-black"
              }`}
            >
              {msg.text}
              {msg.type === "bot" && !isMuted && <TTSButton text={msg.text} />}
            </motion.div>
          ))}

          {botTyping && <p className="text-gray-400 text-sm">I'm thinking... 🤔</p>}
          {currentBotMessage && (
            <p className="p-3 rounded-lg bg-[#F8B400] self-start text-black">{currentBotMessage}</p>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center bg-[#222831]/50 p-3 rounded-lg shadow-md mt-4">
          <STTButton onResult={(transcript) => setInput(transcript)} />
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none p-2 border-b border-gray-600 focus:border-white transition-all duration-300 ml-3"
            placeholder="Tell me what's on your mind..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          {/* Mute/Unmute Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mx-3 p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-all"
            onClick={() => {
              setIsMuted((prev) => !prev);
              if (!isMuted && utteranceRef.current) {
                window.speechSynthesis.cancel();
              }
            }}
          >
            {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400" />}
          </motion.button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#0077FF] px-4 py-2 rounded-lg hover:bg-[#005BBB] transition-all duration-300"
            onClick={sendMessage}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
