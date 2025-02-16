const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");

// POST: Send a user message and get bot response
router.post("/send", async (req, res) => {
  try {
    const { email, text } = req.body;

    if (!email || !text) {
      return res.status(400).json({ error: "Email and text are required" });
    }

    // Find or create chat session
    let chat = await Chat.findOne({ email });
    if (!chat) {
      chat = new Chat({ email, messages: [] });
    }

    // Add user message
    chat.messages.push({ text, type: "user" });

    // Bot Response (Modify this if integrating with AI)
    const botResponse = "Hello! How can I assist you?";  // Replace with AI-generated response
    chat.messages.push({ text: botResponse, type: "bot" });

    await chat.save();
    res.json({ response: botResponse, messages: chat.messages });
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: Retrieve chat history by email
router.get("/:email", async (req, res) => {
  try {
    const chat = await Chat.findOne({ email: req.params.email });
    res.json(chat || { messages: [] });
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
