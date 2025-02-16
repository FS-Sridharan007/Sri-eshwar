import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ArrowRight, Sparkles, Code, Shield, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function InteractivePage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
      {/* Navbar */} 
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute top-4 left-4 flex gap-4 items-center z-50"
      >
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Navbar */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-16 left-4 bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col gap-4 sm:hidden z-50"
        >
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Home</a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Features</a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Pricing</a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">About</a>
        </motion.nav>
      )}

      {/* Desktop Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute top-4 right-4 flex gap-4 items-center"
      >
        <nav className="hidden sm:flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Home</a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Features</a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Pricing</a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">About</a>
        </nav>
        
        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 px-4 py-2 rounded-lg text-white flex items-center gap-2 shadow-lg hover:bg-green-600 transition-all duration-300"
          onClick={() => navigate("/login")}
        >
          Login <LogIn size={20} />
        </motion.button>
      </motion.div>

      {/* Main Content (Pushed Down) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-10 w-full pt-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-center"
        >
          Welcome to Next-Gen AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-gray-300 mt-4 max-w-xs sm:max-w-lg text-base sm:text-lg text-center"
        >
          Elevate your relationships with AI-powered insights and seamless integrations.
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          Get Started <ArrowRight size={20} />
        </motion.button>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full"
        >
          {[{
            icon: Sparkles, title: "AI Intelligence", text: "Advanced AI-powered assistance for seamless connections.", color: "text-blue-400"
          }, {
            icon: Code, title: "User Friendly", text: "Robust relationships with friendly integration", color: "text-green-400"
          }, {
            icon: Shield, title: "Secure & Private", text: "Top-tier encryption for your data protection.", color: "text-red-400"
          }].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-gray-800 p-6 rounded-lg text-center shadow-lg transition-transform duration-300"
            >
              <feature.icon size={40} className={`mx-auto ${feature.color}`} />
              <h2 className="text-lg sm:text-xl font-semibold mt-4">{feature.title}</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
