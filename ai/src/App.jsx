// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Starting from './pages/Starting';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starting />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App