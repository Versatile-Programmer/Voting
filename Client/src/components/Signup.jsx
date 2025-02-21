// import React, { useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletId, setWalletId] = useState('');
  const [department, setDepartment] = useState('');
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Physics', 'Chemistry']; // Example departments
  const clubOptions = ['Coding Club', 'Robotics Club', 'Music Club', 'Drama Club', 'Sports Club']; // Example clubs

  const handleClubChange = (club) => {
    if (clubs.includes(club)) {
      setClubs(clubs.filter((c) => c !== club));
    } else {
      setClubs([...clubs, club]);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    const signupData = { username, email, password, walletId, department, clubs }
    console.log('Submitted data:', signupData);
    try{
      const response = await axios.post('http://localhost:5000/auth/signup',signupData );
      console.log("response created",response.data);
      navigate("/login")
    }catch(error){
      console.log("Error Occured while Sigup=>",error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* ... other input fields for email, password, walletId */}
          <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"  // Use type="email" for email validation
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password" // Use type="password" to hide the password
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="walletId" className="block text-gray-700 text-sm font-bold mb-2">Wallet ID</label>
          <input
            type="text"
            id="walletId"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
          />
        </div>

          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Department</label>
            <select
              id="department"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Clubs</label>
            {clubOptions.map((club) => (
              <div key={club} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={club}
                  className="mr-2"
                  checked={clubs.includes(club)}
                  onChange={() => handleClubChange(club)}
                />
                <label htmlFor={club} className="text-gray-700">{club}</label>
              </div>
            ))}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};


export default SignupPage;