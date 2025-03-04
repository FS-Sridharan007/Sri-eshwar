import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Moon, Sun } from "lucide-react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import ChatbotGreeting from "../components/ChatBotGreeting";

export default function ChatbotLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-blue-100"} relative`}>
    <ChatbotGreeting />
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`p-8 rounded-xl shadow-2xl w-96 border border-white/20 relative ${
          darkMode ? "bg-gray-800 text-white" : "bg-white/30 backdrop-blur-lg"
        }`}
      >
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-gray-600" size={24} />}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">{darkMode ? "Welcome Back 🤖" : "AI Chat Login"}</h2>

        {/* Email Input */}
        <div className="relative mb-5">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-10 py-3 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-10 py-3 rounded-lg focus:outline-none focus:border-blue-400"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="hover:text-blue-600 transition">Forgot Password?</a>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition font-bold"
        >
          Login
        </motion.button>

        {/* Social Login */}
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
