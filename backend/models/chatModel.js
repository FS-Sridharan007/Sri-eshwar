const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user_text: { type: String, required: true }, // User's message
  user_type: { type: String, enum: ["user"], required: true }, // Ensuring only "user" type

  bot_text: { type: String, required: true }, // Bot's response
  bot_type: { type: String, enum: ["bot"], required: true }, // Ensuring only "bot" type

  timestamp: { type: Date, default: Date.now }, // Timestamp for the interaction
});

const chatSchema = new mongoose.Schema({
  email: { type: String, required: true }, // User's email
  messages: [messageSchema], // Array of user-bot interactions
});

module.exports = mongoose.model("Chat", chatSchema);
