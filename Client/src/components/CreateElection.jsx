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
  const navigate = useNavigate();

  // Update candidate array when the number of candidates changes
  const handleNumCandidatesChange = (e) => {
    const number = parseInt(e.target.value) || 0;
    setNumCandidates(number);
    setCandidates(Array(number).fill({ name: '', description: '' }));
  };

  // Handle updates to individual candidate fields
  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
    setCandidates(updatedCandidates);
  };

  // Handle form submission
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
      // Send POST request to backend
      console.log("Priting election data=>",electionData)
      const response = await axios.post('http://localhost:5000/api/elections', electionData);
      console.log('Election created:', response.data);
      
      // Set election data to state (if needed)
      setElectionData(response.data);

      // Navigate to the voting page after successful creation
      navigate('/voting');
    } catch (error) {
      console.error('Error creating election:', error);
      // You can add more error handling here
    }
  };

  return (
    <div style={styles.container}>
      <h2>Election Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name of the Election:
          <input
            type="text"
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Number of Candidates:
          <input
            type="number"
            value={numCandidates}
            onChange={handleNumCandidatesChange}
            min="0"
            required
            style={styles.input}
          />
        </label>

        {Array.from({ length: numCandidates }).map((_, index) => (
          <div key={index} style={styles.candidateContainer}>
            <label style={styles.label}>
              Candidate {index + 1} Name:
              <input
                type="text"
                value={candidates[index]?.name || ''}
                onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Candidate {index + 1} Description:
              <textarea
                value={candidates[index]?.description || ''}
                onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
                required
                style={{ ...styles.input, height: '60px' }}
              />
            </label>
          </div>
        ))}

        <label style={styles.label}>
          Start Time of Election:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          End Time of Election:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Club of Election:
          <textarea
            value={club}
            onChange={(e) => setClub(e.target.value)}
            required
            style={{ ...styles.input, height: '80px' }}
          />
        </label>

        <button type="submit" style={styles.button}>
          Submit Election Details
        </button>
      </form>
    </div>
  );
}

// Styles remain the same...

export default Home;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  candidateContainer: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
