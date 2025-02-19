import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Moon, Sun } from "lucide-react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import ChatbotGreeting from "../components/ChatBotGreeting";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChatbotLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      const { token } = response.data; // Extract token from response
  
      if (token) {
        localStorage.setItem("userToken", token); // Store token for authentication
        localStorage.setItem("userEmail", email); // Store email (optional)
        navigate("/chat-area", { replace: true }); // Redirect user & prevent back navigation
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };
  
  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-blue-100"} relative`}>
      <ChatbotGreeting />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`p-8 rounded-xl shadow-2xl w-96 border border-white/20 relative ${darkMode ? "bg-gray-800 text-white" : "bg-white/30 backdrop-blur-lg"}`}
      >
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-gray-600" size={24} />}
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">{darkMode ? "Welcome Back 🤖" : "AI Chat Login"}</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <div className="relative mb-5">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-10 py-3 rounded-lg focus:outline-none focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-10 py-3 rounded-lg focus:outline-none focus:border-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition font-bold"
          onClick={handleLogin}
        >
          Login
        </motion.button>
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-3">Or sign in with</p>
          <div className="flex justify-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} className="p-3 rounded-lg border border-gray-400 hover:border-gray-600">
              <FaGoogle size={20} className="text-red-500" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} className="p-3 rounded-lg border border-gray-400 hover:border-gray-600">
              <FaFacebook size={20} className="text-blue-600" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} className="p-3 rounded-lg border border-gray-400 hover:border-gray-600">
              <FaApple size={20} className="text-black" />
            </motion.button>
          </div>
        </div>
        <div className="flex justify-center items-center text-gray-500 text-sm mb-4 mt-6">
          <p>Don&apos;t have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a></p>
        </div>
      </motion.div>
    </div>
  );
}