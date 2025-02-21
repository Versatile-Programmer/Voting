import React from 'react';

const Dashboard = ({ user }) => {
    console.log("priting user=>",user)
  const { name, email, department, isAdmin, clubs, walletId } = user;

  // Generate avatar URL based on the user's initials (using the DiceBear Avatars API)
  const initials = name ? name.split(" ").map((n) => n[0]).join("") : "";
  console.log("priting initials=>",initials)
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}background=random`;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* User Avatar */}
      <div className="w-24 h-24 mb-4">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-full h-full rounded-full border-4 border-blue-500"
        />
      </div>

      {/* User Information */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard</h2>
        
        <div className="text-gray-700">
          <p className="mb-2"><span className="font-semibold">Name:</span> {name}</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {email}</p>
          <p className="mb-2"><span className="font-semibold">Department:</span> {department}</p>
          <p className="mb-2">
            <span className="font-semibold">Admin:</span> {isAdmin ? "Yes" : "No"}
          </p>
          <p className="mb-2"><span className="font-semibold">Wallet ID:</span> {walletId}</p>
          <p className="mb-2">
            <span className="font-semibold">Clubs:</span> {clubs.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
