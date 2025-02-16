/*import { useState, useEffect } from "react";

const ChatHistory = ({ email }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
        try {
          if (!userEmail) return;
          const response = await axios.get(`http://localhost:8080/chat/history/${userEmail}`);
      
          // Extract messages properly
          setMessages(response.data.messages || []);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };
      

    if (email) fetchChatHistory();
  }, [email]);

  return (
    <div className="chat-history">
      <h3>Chat History</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
*/