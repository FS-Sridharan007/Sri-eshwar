import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function ChatbotGreeting() {
  const [chatMessage, setChatMessage] = useState("");
  const messages = [
    "Hey there! 😊",
    "I'm here for you. 💙",
    "You are not alone. 🤗",
    "How can I help today?",
  ];
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setChatMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-10 flex items-center space-x-3 bg-white/80 backdrop-blur-lg px-5 py-2 rounded-full shadow-lg"
    >
      {/* Chatbot Icon with Gentle Bounce Effect */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaRobot className="text-blue-500 text-2xl" />
      </motion.div>

      {/* Smooth Transition for Supportive Messages */}
      <AnimatePresence mode="wait">
        <motion.span
          key={chatMessage} // Key change triggers animation
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="text-gray-700 font-medium"
        >
          {chatMessage}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
