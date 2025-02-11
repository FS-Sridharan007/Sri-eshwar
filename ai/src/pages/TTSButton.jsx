import { useState, useRef } from "react";

export default function TTSButton({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const speakText = () => {
    if (!window.speechSynthesis) {
      console.error("Text-to-Speech is not supported in this browser.");
      return;
    }

    // Stop if already speaking
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Optimize text to reduce pauses after punctuation
    const optimizedText = text.replace(/([.,!?;])/g, "\u200A"); // Replaces with thin space

    // SSML version to explicitly define pauses (Optional, improves control)
    const ssml = `<speak>${optimizedText.replace(
      /([.?!])/g,
      '<break time="200ms"/>'
    )}</speak>`;

    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "en-US";
    utterance.rate = 1.3; // Slightly increased for better flow
    utterance.pitch = 1;
    utterance.volume = 1;

    // Check if the browser supports SSML parsing
    if ("speechSynthesisUtterance" in window) {
      utterance.text = optimizedText; // Use the improved text version
    } else {
      utterance.text = ssml; // Use SSML if supported
    }

    // Reduce pause duration between words
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        console.log("Speaking:", event.charIndex);
      }
    };

    // Reset speaking state when speech ends
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <button
      onClick={speakText}
      className={`ml-2 p-2 rounded-full shadow-md transition-all ${
        isSpeaking ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"
      } text-white`}
    >
      {isSpeaking ? "⏸️" : "🔊"}
    </button>
  );
}
