const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/send-feedback", async (req, res) => {
  const { email, feedback } = req.body;

  if (!email || !feedback.trim()) {
    return res.status(400).json({ error: "Email and feedback are required!" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "jairusgold0112@gmail.com",
    subject: "New Feedback Received",
    text: `You have received new feedback.\n\nFrom: ${email}\n\nMessage: ${feedback}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.status(200).json({ message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send feedback. Please try again later." });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
