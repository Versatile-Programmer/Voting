// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Home({ setElectionData }) {
//   const [electionName, setElectionName] = useState('');
//   const [numCandidates, setNumCandidates] = useState(0);
//   const [candidates, setCandidates] = useState([]);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [club, setClub] = useState('');
//   const navigate = useNavigate();

//   // Update candidate array when the number of candidates changes
//   const handleNumCandidatesChange = (e) => {
//     const number = parseInt(e.target.value) || 0;
//     setNumCandidates(number);
//     setCandidates(Array(number).fill({ name: '', description: '' }));
//   };

//   // Handle updates to individual candidate fields
//   const handleCandidateChange = (index, field, value) => {
//     const updatedCandidates = [...candidates];
//     updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
//     setCandidates(updatedCandidates);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const electionData = {
//       electionName,
//       numCandidates,
//       candidates,
//       startTime,
//       endTime,
//       club,
//     };

//     try {
//       // Send POST request to backend
//       console.log("Priting election data=>",electionData)
//       const response = await axios.post('http://localhost:5000/api/elections', electionData);
//       console.log('Election created:', response.data);
      
//       // Set election data to state (if needed)
//       setElectionData(response.data);

//       // Navigate to the voting page after successful creation
//       navigate('/generalElectionPage');
//     } catch (error) {
//       console.error('Error creating election:', error);
//       // You can add more error handling here
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Election Form</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <label style={styles.label}>
//           Name of the Election:
//           <input
//             type="text"
//             value={electionName}
//             onChange={(e) => setElectionName(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Number of Candidates:
//           <input
//             type="number"
//             value={numCandidates}
//             onChange={handleNumCandidatesChange}
//             min="0"
//             required
//             style={styles.input}
//           />
//         </label>

//         {Array.from({ length: numCandidates }).map((_, index) => (
//           <div key={index} style={styles.candidateContainer}>
//             <label style={styles.label}>
//               Candidate {index + 1} Name:
//               <input
//                 type="text"
//                 value={candidates[index]?.name || ''}
//                 onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
//                 required
//                 style={styles.input}
//               />
//             </label>
//             <label style={styles.label}>
//               Candidate {index + 1} Description:
//               <textarea
//                 value={candidates[index]?.description || ''}
//                 onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
//                 required
//                 style={{ ...styles.input, height: '60px' }}
//               />
//             </label>
//           </div>
//         ))}

//         <label style={styles.label}>
//           Start Time of Election:
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           End Time of Election:
//           <input
//             type="datetime-local"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Club of Election:
//           <textarea
//             value={club}
//             onChange={(e) => setClub(e.target.value)}
//             required
//             style={{ ...styles.input, height: '80px' }}
//           />
//         </label>

//         <button type="submit" style={styles.button}>
//           Submit Election Details
//         </button>
//       </form>
//     </div>
//   );
// }

// // Styles remain the same...

// export default Home;

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     backgroundColor: '#f8f9fa',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     maxWidth: '500px',
//   },
//   label: {
//     marginBottom: '10px',
//     fontSize: '16px',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     fontSize: '16px',
//     marginTop: '5px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   candidateContainer: {
//     padding: '10px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     marginBottom: '10px',
//   },
//   button: {
//     marginTop: '20px',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home({ setElectionData }) {
  const [electionName, setElectionName] = useState('');
  const [numCandidates, setNumCandidates] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [club, setClub] = useState('');
  const clubs = ['Coding Club', 'Robotics Club', 'Music Club', 'Drama Club', 'Sports Club'];
  const navigate = useNavigate();

  const handleNumCandidatesChange = (e) => {
    const number = parseInt(e.target.value) || 0;
    setNumCandidates(number);
    setCandidates(Array(number).fill({ name: '', description: '' }));
  };

  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
    setCandidates(updatedCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const electionData = {
      electionName,
      numCandidates,
      candidates,
      startTime,
      endTime,
      club,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/elections', electionData);
      console.log('Election created:', response.data);
      setElectionData(response.data);
      navigate('/generalElectionPage');
    } catch (error) {
      console.error('Error creating election:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-purple-800">Create New Election</h2>
        <form onSubmit={handleSubmit} className="space-y-4">


          <div>
            <label htmlFor="electionName" className="block text-sm font-medium text-gray-700">
              Name of the Election:
            </label>
            <input
              type="text"
              id="electionName" // Added id for accessibility
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div> {/* Number of Candidates */}
            <label htmlFor="numCandidates" className="block text-sm font-medium text-gray-700">
              Number of Candidates:
            </label>
            <input
              type="number"
              id="numCandidates"
              value={numCandidates}
              onChange={handleNumCandidatesChange}
              min="0"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {Array.from({ length: numCandidates }).map((_, index) => (
            <div key={index} className="mb-4">  {/* Candidate information */}
              <label htmlFor={`candidateName${index}`} className="block text-sm font-medium text-gray-700">
                Candidate {index + 1} Name:
              </label>
              <input
                type="text"
                id={`candidateName${index}`}
                value={candidates[index]?.name || ''}
                onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <label htmlFor={`candidateDescription${index}`} className="block text-sm font-medium text-gray-700 mt-2">
                Candidate {index + 1} Description:
              </label>
              <textarea
                id={`candidateDescription${index}`}
                value={candidates[index]?.description || ''}
                onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}


           <div> {/* Start Time */}
           <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time:</label>
            <input
               type="datetime-local"
                id="startTime"
              value={startTime}
               onChange={(e) => setStartTime(e.target.value)}
                required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             />
          </div>

          <div> {/* End Time */}
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time:</label>
             <input
               type="datetime-local"
                id="endTime"
               value={endTime}
               onChange={(e) => setEndTime(e.target.value)}
               required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
           </div>

          {/* <div> {/* Club 
            <label htmlFor="club" className="block text-sm font-medium text-gray-700">Club:</label>
             <textarea
               id="club"
               value={club}
               onChange={(e) => setClub(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
           </div> */}
            <div> {/* Club Dropdown */}
        <label htmlFor="club" className="block text-sm font-medium text-gray-700">Club:</label>
        <select
          id="club"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a Club</option> {/* Default option */}
          {clubs.map((clubName) => (
            <option key={clubName} value={clubName}>
              {clubName}
            </option>
          ))}
        </select>
      </div>



          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Create Election
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;