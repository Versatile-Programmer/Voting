// src/components/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle authentication and redirect
        console.log("Login successful:", { username, password });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login to Vote</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                    <span>
                        Don't have an account ?
                        <Link to="/signup" className="text-blue-600 hover:text-blue-700">sign up</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
