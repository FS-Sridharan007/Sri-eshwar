const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["user", "bot"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  email: { type: String, required: true },
  messages: [messageSchema],
});

module.exports = mongoose.model("Chat", chatSchema);
