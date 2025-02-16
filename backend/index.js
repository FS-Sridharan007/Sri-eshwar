// Import required modules
const express = require('express');  // Import express
const cors = require('cors');  // Import cors
require('dotenv').config();  // Load environment variables from .env file

// Initialize the Express app
const app = express();

// Enable CORS
app.use(cors());  // This will allow cross-origin requests from your frontend

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up your routes (you can add your chatbot API here)
app.post('/chat', async (req, res) => {
  try {
    const messages = req.body.messages;
    // Your logic to process the messages and interact with OpenAI, etc.
    res.json({ response: 'AI response here' });  // Example response
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 7000;  // Use 7000 by default
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
