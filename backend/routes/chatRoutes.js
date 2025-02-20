const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");

router.post("/sendMessage", async (req, res) => {
  const { email, userText, botText } = req.body;

  try {
    let chat = await Chat.findOne({ email });

    if (!chat) {
      chat = new Chat({ email, messages: [] });
    }

    // Remove <think>...</think> content from bot response
    const cleanBotText = botText.replace(/<think>[\s\S]*?<\/think>\n*/, "").trim();

    // Create a structured message entry
    const newMessage = {
      user_text: userText,
      user_type: "user",
      bot_text: cleanBotText,
      bot_type: "bot",
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);

    await chat.save();

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const chat = await Chat.findOne({ email: req.params.email });
    res.json(chat || { messages: [] });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;