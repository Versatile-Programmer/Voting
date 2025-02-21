// // GeneralElectionPage.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function GeneralElectionPage({ user,setUser }) { 
//   const [ongoingElections, setOngoingElections] = useState([]);
//   const [upcomingElections, setUpcomingElections] = useState([]);
//   const [pastElections, setPastElections] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("printing user",user)
//     if (!user) {
//       console.log("No user found in generalElectionPage")
//       navigate('/login'); // Redirect to login if user is not authenticated
//     }

//     const fetchElections = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/elections');
//         const elections = response.data;

//         const now = new Date();
//         const ongoing = [];
//         const upcoming = [];
//         const past = [];

//         elections.forEach((election) => {
//           const startTime = new Date(election.startTime);
//           const endTime = new Date(election.endTime);
//           if (now >= startTime && now <= endTime) {
//             ongoing.push(election);
//           } else if (now < startTime) {
//             upcoming.push(election);
//           } else {
//             past.push(election);
//           }
//         });

//         setOngoingElections(ongoing);
//         setUpcomingElections(upcoming);
//         setPastElections(past);
//       } catch (error) {
//         console.error('Error fetching elections:', error);
//       }
//     };

//     fetchElections();
//   }, [user, navigate]);

//   const handleParticipate = (electionId) => {
//     navigate(`/voting/${electionId}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Clear the token
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <div>
//       {/* Navigation Bar */}
//       <nav style={styles.navBar}>
//         <a href="/dashboard" style={styles.navLink}>Dashboard</a>
//         {user?.isAdmin && (
//           <>
//             <a href="/clubmanagement" style={styles.navLink}>Club Management</a>
//             <a href="/createElection" style={styles.navLink}>Create Election</a>
//           </>
//         )}
//         <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
//       </nav>

//       <div style={styles.container}>
//         <h2>All Elections</h2>

//         {/* Ongoing Elections */}
//         <section style={styles.section}>
//           <h3>Ongoing Elections</h3>
//           {ongoingElections.length > 0 ? (
//             ongoingElections.map((election) => (
//               <div key={election._id} style={styles.electionCard}>
//                 <h4>{election.electionName}</h4>
//                 <p>Club: {election.club}</p>
//                 {user?.clubs[0] === election.club && (
//                   <button onClick={() => handleParticipate(election._id)} style={styles.button}>
//                     Participate
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No ongoing elections</p>
//           )}
//         </section>

//         {/* Upcoming Elections */}
//         <section style={styles.section}>
//           <h3>Upcoming Elections</h3>
//           {upcomingElections.length > 0 ? (
//             upcomingElections.map((election) => (
//               <div key={election._id} style={styles.electionCard}>
//                 <h4>{election.electionName}</h4>
//                 <p>Club: {election.club}</p>
//               </div>
//             ))
//           ) : (
//             <p>No upcoming elections</p>
//           )}
//         </section>

//         {/* Past Elections */}
//         <section style={styles.section}>
//           <h3>Past Elections</h3>
//           {pastElections.length > 0 ? (
//             pastElections.map((election) => (
//               <div key={election._id} style={styles.electionCard}>
//                 <h4>{election.electionName}</h4>
//                 <p>Club: {election.club}</p>
//               </div>
//             ))
//           ) : (
//             <p>No past elections</p>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   navBar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '10px 20px',
//     backgroundColor: '#007bff',
//   },
//   navLink: {
//     color: '#fff',
//     textDecoration: 'none',
//     marginRight: '20px',
//   },
//   logoutButton: {
//     padding: '8px 12px',
//     backgroundColor: '#dc3545',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   container: {
//     padding: '20px',
//     backgroundColor: '#f8f9fa',
//     color: '#333',
//   },
//   section: {
//     marginBottom: '20px',
//   },
//   electionCard: {
//     padding: '15px',
//     margin: '10px 0',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//   },
//   button: {
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };

// export default GeneralElectionPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GeneralElectionPage({ user, setUser }) {
  const [ongoingElections, setOngoingElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    const fetchElections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/elections');
        // ... (rest of the election fetching and filtering logic remains the same)
        const elections = response.data;

                const now = new Date();
                const ongoing = [];
                const upcoming = [];
                const past = [];
        
                elections.forEach((election) => {
                  const startTime = new Date(election.startTime);
                  const endTime = new Date(election.endTime);
                  if (now >= startTime && now <= endTime) {
                    ongoing.push(election);
                  } else if (now < startTime) {
                    upcoming.push(election);
                  } else {
                    past.push(election);
                  }
                });
        
                setOngoingElections(ongoing);
                setUpcomingElections(upcoming);
                setPastElections(past);
      } catch (error) {
        console.error('Error fetching elections:', error);
      }
    };

    fetchElections();
  }, [user, navigate]);

  const handleParticipate = (electionId) => {
    navigate(`/voting/${electionId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a>
          {user?.isAdmin && (
            <>
              <a href="/clubmanagement" className="text-white hover:text-gray-300">Club Management</a>
              <a href="/createElection" className="text-white hover:text-gray-300">Create Election</a>
            </>
          )}
        </div>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </nav>


      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">All Elections</h2>

        {/* Election Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Ongoing Elections */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Ongoing Elections</h3>
            {ongoingElections.map((election) => (
              <div key={election._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h4 className="text-lg font-medium">{election.electionName}</h4>
                <p className="text-gray-600">Club: {election.club}</p>
                 {user?.clubs[0] === election.club && (
                <button
                  onClick={() => handleParticipate(election._id)}
                  className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Participate
                </button>
                )}
              </div>
            ))}
             {ongoingElections.length === 0 && <p className="text-gray-600">No ongoing elections</p>}
          </section>


          {/* Upcoming Elections */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Upcoming Elections</h3>
             {upcomingElections.map((election) => (
              <div key={election._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h4 className="text-lg font-medium">{election.electionName}</h4>
                <p className="text-gray-600">Club: {election.club}</p>
              </div>
            ))}
             {upcomingElections.length === 0 && <p className="text-gray-600">No upcoming elections</p>}
          </section>

          {/* Past Elections */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Past Elections</h3>
            {pastElections.map((election) => (
              <div key={election._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h4 className="text-lg font-medium">{election.electionName}</h4>
                <p className="text-gray-600">Club: {election.club}</p>
              </div>
            ))}
             {pastElections.length === 0 && <p className="text-gray-600">No past elections</p>}
          </section>

        </div>


      </div>
    </div>
  );
}

export default GeneralElectionPage;