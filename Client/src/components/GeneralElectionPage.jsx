// GeneralElectionPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GeneralElectionPage({ user,setUser }) { 
  const [ongoingElections, setOngoingElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("printing user",user)
    if (!user) {
      console.log("No user found in generalElectionPage")
      navigate('/login'); // Redirect to login if user is not authenticated
    }

    const fetchElections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/elections');
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
    localStorage.removeItem("token"); // Clear the token
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={styles.navBar}>
        <a href="/dashboard" style={styles.navLink}>Dashboard</a>
        {user?.isAdmin && (
          <>
            <a href="/clubmanagement" style={styles.navLink}>Club Management</a>
            <a href="/createElection" style={styles.navLink}>Create Election</a>
          </>
        )}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </nav>

      <div style={styles.container}>
        <h2>All Elections</h2>

        {/* Ongoing Elections */}
        <section style={styles.section}>
          <h3>Ongoing Elections</h3>
          {ongoingElections.length > 0 ? (
            ongoingElections.map((election) => (
              <div key={election._id} style={styles.electionCard}>
                <h4>{election.electionName}</h4>
                <p>Club: {election.club}</p>
                {user?.clubs[0] === election.club && (
                  <button onClick={() => handleParticipate(election._id)} style={styles.button}>
                    Participate
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No ongoing elections</p>
          )}
        </section>

        {/* Upcoming Elections */}
        <section style={styles.section}>
          <h3>Upcoming Elections</h3>
          {upcomingElections.length > 0 ? (
            upcomingElections.map((election) => (
              <div key={election._id} style={styles.electionCard}>
                <h4>{election.electionName}</h4>
                <p>Club: {election.club}</p>
              </div>
            ))
          ) : (
            <p>No upcoming elections</p>
          )}
        </section>

        {/* Past Elections */}
        <section style={styles.section}>
          <h3>Past Elections</h3>
          {pastElections.length > 0 ? (
            pastElections.map((election) => (
              <div key={election._id} style={styles.electionCard}>
                <h4>{election.electionName}</h4>
                <p>Club: {election.club}</p>
              </div>
            ))
          ) : (
            <p>No past elections</p>
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#007bff',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '20px',
  },
  logoutButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  section: {
    marginBottom: '20px',
  },
  electionCard: {
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default GeneralElectionPage;
