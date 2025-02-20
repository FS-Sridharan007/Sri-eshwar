const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes");
const ChatModel = require("./models/chatModel"); // Import chatRoutes

dotenv.config();
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

app.post("/chat/send", async (req, res) => {
  try {
    const { email, text, type } = req.body;
    if (!email || !text) {
      return res.status(400).json({ error: "Email and message text are required" });
    }
    await ChatModel.updateOne(
      { email },
      { $push: { messages: { text, type } } },
      { upsert: true }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Use Chat Routes
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Chat Server running on http://localhost:${PORT}`);
});