// import React from 'react';  // Add this line
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch the members from the Flask backend
    fetch('/members') // Ensure this URL points to your Flask backend
      .then(response => response.json())
      .then(data => setMembers(data.members))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Hello Sweetcoders...Happy Hacking! <span>😊</span></code>
        </p>
      </header>
      <h3>Here is the list of our members</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
