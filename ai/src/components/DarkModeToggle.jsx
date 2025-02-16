import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.div
      className={`relative h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <motion.div
        className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        onClick={() => setDarkMode(!darkMode)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          key={darkMode ? "sun" : "moon"} // Ensures smooth transition
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          {darkMode ? (
            <Sun className="text-yellow-400" size={24} />
          ) : (
            <Moon className="text-gray-600" size={24} />
          )}
        </motion.div>
      </motion.div>

      {/* Content */}
      <h1 className="text-2xl font-semibold">Toggle Dark Mode 🌙☀️</h1>
    </motion.div>
  );
}
