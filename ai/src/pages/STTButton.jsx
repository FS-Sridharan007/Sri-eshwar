import { useState, useRef } from "react";

export default function STTButton({ onResult }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  const startListening = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false; // Stops after a sentence
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult((prevText) => prevText + " " + transcript);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        stopListening();
      }, 1200);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <button
      onClick={startListening}
      className={`p-2 rounded-full transition-all shadow-md ${
        isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"
      } text-white text-xl`}
    >
      {isListening ? "🎙️" : "🎤"}
    </button>
  );
}
