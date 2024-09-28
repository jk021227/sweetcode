import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [nickname, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // send the profile data to the backend
      const response = await fetch('/createprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, username, password }),
      });
  
      // Handle response status
      if (response.status === 200) {
        // Profile created successfully
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token); // Save token to local storage
        navigate('/'); // Redirect to the dashboard
      } else if (response.status === 409) {
        // Conflict error (Username already exists)
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'User already exists.');
      } else {
        // Handle other errors
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create profile.');
      }
    } catch (error) {
      // Network or other unexpected error
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };  

  return (
      <div className="container">
        <div className="title">Create Profile</div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="input"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="button2"
            type="button"
            onClick={() => navigate('/')} // Navigate back to home or desired route
          >
            Back
          </button>
          <button className="button2" type="submit">
            Save
          </button>
        </form>
      </div>
  );
};

export default CreateProfile;
