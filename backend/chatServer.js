const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes"); // Import chatRoutes

dotenv.config();
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

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
