// Voting.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Voting() {
  const { electionId } = useParams();
  const [electionData, setElectionData] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/elections/${electionId}`);
        setElectionData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching election data:', err);
        setError('Failed to load election data.');
        setLoading(false);
      }
    };
    fetchElectionData();
  }, [electionId]);

  // Countdown timer calculation
  useEffect(() => {
    if (!electionData) return;

    const calculateTimeLeft = () => {
      const end = new Date(electionData.endTime);
      const now = new Date();
      const timeDifference = end - now;

      if (timeDifference > 0) {
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Election Ended');
      }
    };

    const timerId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [electionData]);

  // Handle vote selection
  const handleVote = (index) => {
    setSelectedCandidate(index);
  };

  // Handle vote submission
  const handleSubmitVote = () => {
    if (selectedCandidate === null) {
      alert('Please select a candidate to vote for!');
      return;
    }
    const selectedCandidateData = electionData.candidates[selectedCandidate];
    console.log('Vote submitted for:', selectedCandidateData);
    alert(`Your vote for ${selectedCandidateData.name} has been submitted!`);
    // Here you could add further logic for vote submission, e.g., sending data to an API
  };

  if (loading) return <p>Loading election details...</p>;
  if (error) return <p>{error}</p>;
  if (!electionData) return null;

  const { electionName, club, candidates } = electionData;

  return (
    <div style={styles.container}>
      <h1>{electionName}</h1>
      <p style={styles.club}>Club - {club}</p>
      <div style={styles.timer}>
        <h3>Election Ends In: {timeLeft}</h3>
      </div>

      <div style={styles.candidatesContainer}>
        <h2>Candidates</h2>
        {candidates.map((candidate, index) => (
          <div key={index} style={styles.candidateCard}>
            <h3>{candidate.name}</h3>
            <p>{candidate.description}</p>
            <button
              onClick={() => handleVote(index)}
              style={{
                ...styles.voteButton,
                backgroundColor: selectedCandidate === index ? '#4CAF50' : '#007bff',
              }}
            >
              {selectedCandidate === index ? 'Selected' : 'Vote'}
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleSubmitVote} style={styles.submitButton}>
        Submit Vote
      </button>
    </div>
  );
}

// Sample styles for the page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    color: '#333',
    textAlign: 'center',
  },
  club: {
    fontSize: '18px',
    margin: '10px 0 20px',
    maxWidth: '600px',
  },
  timer: {
    fontSize: '20px',
    margin: '20px 0',
    color: '#e63946',
  },
  candidatesContainer: {
    width: '100%',
    maxWidth: '600px',
  },
  candidateCard: {
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textAlign: 'left',
  },
  voteButton: {
    marginTop: '10px',
    padding: '8px 16px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Voting;
