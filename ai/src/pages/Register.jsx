// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { motion } from "framer-motion";
import Robot1 from "../assets/robot.png";
import Robot2 from "../assets/robot2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    language: "",
    purpose: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required!";
      }
    });

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        console.error("There was an error during signup:", error);
        if (error.response) {
          setErrors({ apiError: error.response.data.message || "Signup failed. Please try again." });
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-center min-h-screen bg-blue-100 relative overflow-hidden"
    >
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-10 left-10"
      >
        <img src={Robot1} alt="Robot" className="w-16 h-16 opacity-100" />
      </motion.div>

      <motion.div
        initial={{ y: 10 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 right-10"
      >
        <img src={Robot2} alt="Robot" className="w-20 h-20 md:w-28 md:h-36 opacity-90" />
        <p className="flex justify-center text-gray-500 text-sm mb-2 mt-2">
          Hey, What&lsquo;s up!
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="bg-blue-50 shadow-2xl rounded-lg p-8 w-96 border-white/20 relative"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up for Chatbot</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          <input type="email" name="email" placeholder="Email Address" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="text" name="phone" placeholder="Phone Number (Optional)" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" value={formData.phone} onChange={handleChange} />

          <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          {errors.apiError && <p className="text-red-500 text-sm text-center">{errors.apiError}</p>}

          <select
            name="language"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Preferred Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>

          <select
            name="purpose"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.purpose}
            onChange={handleChange}
          >
            <option value="">Purpose of Using Chatbot</option>
            <option value="business">Business</option>
            <option value="learning">Learning</option>
            <option value="fun">Fun</option>
          </select>

          <motion.button whileHover={{ scale: 1.05, backgroundColor: "#28a745" }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
            {isSubmitted ? "✔️ Signed Up" : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;