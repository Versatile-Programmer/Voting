// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page (first page) */}
        <Route path="/" element={<Home />} />
        
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        
       <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
