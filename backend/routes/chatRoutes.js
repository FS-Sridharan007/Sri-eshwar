// routes/chatRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to Chat Area, ${req.user.userId}` });
});

router.post("/chat", authMiddleware, async (req, res) => {
  const { messages } = req.body;
  const botResponse = "Hello, how can I assist you today?";
  res.json({ response: botResponse });
});

module.exports = router;