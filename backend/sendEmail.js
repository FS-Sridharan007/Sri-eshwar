const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Verify environment variables are loaded
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env file");
  process.exit(1);
}

// ✅ Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App Password
  },
  tls: {
    rejectUnauthorized: false, // Avoid SSL/TLS issues
  },
});

// ✅ Feedback Email Route
app.post("/send-feedback", async (req, res) => {
    try {
      console.log("Received Data:", req.body); // ✅ Debugging log
  
      const { userEmail, feedback } = req.body;
  
      if (!userEmail || !feedback) {
        console.error("❌ Missing data:", { userEmail, feedback }); // ✅ Log missing data
        return res.status(400).json({ error: "Email and feedback are required!" });
      }
  
      // Send email...
      res.status(200).json({ message: "Feedback sent successfully!" });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ error: "Failed to send feedback. Please try again later." });
    }
  });
  
  

// ✅ Start the Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
