const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");

router.post("/send", async (req, res) => {
  try {
    const { email, text } = req.body;
    if (!email || !text) {
      return res.status(400).json({ error: "Email and text are required" });
    }

    let chat = await Chat.findOne({ email });
    if (!chat) {
      chat = new Chat({ email, messages: [] });
    }

    chat.messages.push({ text, type: "user" });
    chat.messages.push({ text: "Hello! How can I assist you?", type: "bot" });

    await chat.save();
    res.json({ response: "Hello! How can I assist you?" });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:email", async (req, res) => {
  const chat = await Chat.findOne({ email: req.params.email });
  res.json(chat || { messages: [] });
});

module.exports = router;
