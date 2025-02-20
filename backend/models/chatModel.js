const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  email: { type: String, required: true },
  messages: [
    {
      text: { type: String, required: true },
      type: { type: String, default: "text" } // Add default type
    }
  ]
});

const ChatModel = mongoose.model("Chat", chatSchema);
module.exports = ChatModel;
