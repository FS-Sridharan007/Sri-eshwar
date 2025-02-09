// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Starting from './pages/Starting';
import Login from './pages/Login';
import Register from './pages/Register';
import  ChatArea  from './pages/ChatArea';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-area" element={<ChatArea />} />
      </Routes>
    </Router>
  )
}

export default App