import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch logged-in user's email from localStorage (Auto Set)
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail"); // Retrieve user email
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  // ✅ Handle Feedback Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Sending Feedback:", { userEmail, feedback }); // ✅ Debugging log
  
    if (!userEmail) {
      alert("User email not found. Please log in again.");
      return;
    }
  
    if (!feedback.trim()) {
      alert("Feedback cannot be empty!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/send-feedback", {
        userEmail, // ✅ Pass correctly
        feedback,
      });
  
      console.log("✅ Feedback sent successfully:", response.data); // ✅ Debugging log
      alert("Feedback sent successfully!");
      setFeedback("");
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error sending feedback:", error.response?.data || error.message);
      alert("Failed to send feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      {/* Feedback Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-5 right-5 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/30"
      >
        ✨ Feedback
      </button>

      {/* Feedback Form */}
      {showForm && (
        <div className="fixed bottom-20 right-5 bg-white/10 backdrop-blur-lg p-5 rounded-lg shadow-lg w-80 border border-white/20 text-white">
          <h3 className="text-lg font-semibold mb-3">We Value Your Feedback</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="w-full p-2 mb-3 bg-white/20 border border-white/30 rounded-md focus:ring focus:ring-blue-300 text-black h-20"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white transition-all duration-300 ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
