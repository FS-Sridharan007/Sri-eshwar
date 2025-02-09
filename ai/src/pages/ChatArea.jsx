import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Import Axios for API requests

export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, type: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      setTimeout(() => setBotTyping(true), 500);

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
        simulateTyping("Oops! Something went wrong. Please try again.");
      }
    }
  };

  // Typing effect function
  const simulateTyping = (fullText) => {
    let index = 0;
    setCurrentBotMessage("");

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-[#222831] to-[#393E46] text-white relative"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-5 left-6 text-2xl font-bold text-[#00ADB5] tracking-wide drop-shadow-lg"
      >
        ChatBot
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="w-[60%] h-[60vh] flex flex-col bg-[#EEEEEE]/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-700"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center text-lg text-gray-300 mb-2"
        >
          💬 How can I help you today?
        </motion.h2>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-gray-400 text-center"
            >
              You can share anything with me, You know we are friends,right..??
            </motion.p>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`p-3 rounded-lg max-w-xs transition-all duration-300 ${
                  msg.type === "user"
                    ? "bg-[#00ADB5] self-end text-white shadow-md"
                    : "bg-[#F8B400] self-start text-black shadow-md"
                }`}
              >
                {msg.text}
              </motion.div>
            ))
          )}

          {botTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-gray-400 text-sm"
            >
              ChatBot is typing...
            </motion.div>
          )}

          {currentBotMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-3 rounded-lg bg-[#F8B400] self-start text-black shadow-md transition-all duration-300"
            >
              {currentBotMessage}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center bg-[#222831]/50 p-3 rounded-lg shadow-md mt-4"
        >
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none p-2 border-b border-gray-600 focus:border-white transition-all duration-300"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-3 bg-[#0077FF] px-4 py-2 rounded-lg hover:bg-[#005BBB] transition-all duration-300"
            onClick={sendMessage}
          >
            Send
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
