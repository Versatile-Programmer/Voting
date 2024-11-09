// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <div className="w-full max-w-7xl p-8 flex md:flex-row flex-col-reverse rounded-xl shadow-lg bg-white overflow-hidden">
        {/* Right: Project Card */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center space-y-4 transform transition-all hover:scale-105 hover:shadow-xl hover:bg-blue-100">
          <h1 className="text-4xl font-bold text-blue-600">Decentralized Voting System</h1>
          <p className="text-lg text-gray-600 text-center">
            "Ensuring Transparent and Fair Elections in Student Clubs Using Blockchain Technology."
          </p>
          <Link to="/login">
            <button className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

