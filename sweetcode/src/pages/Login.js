import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // send the profile data to the backend
      const response = await fetch('/login', {  // Change '/' to '/login'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      // Handle response status
      if (response.status === 200) {
        const responseData = await response.json();
        // print response data
        console.log(responseData);
        localStorage.setItem('token', responseData.token); // Save token to local storage
        console.log(responseData.message);  // Optional: Log success message
        navigate('/'); // Redirect to the dashboard or home page
      } else if (response.status === 401) { // Change to 401 for unauthorized
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Wrong username/password.');
      } else {
        // Handle other errors
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to login.');
      }
    } catch (error) {
      // Network or other unexpected error
      setErrorMessage('Something went wrong. Please try again later.');
    }
};  

  return (
      <div className="container">
        <div className="title">Login</div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
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
          <button className="button2" type="submit">
            Login
          </button>
        </form>

      <div className="mt-3">
        <p>Don't have an account? <Link to="/createprofile">Create Profile</Link></p>
      </div>
    </div>
  );
};

export default Login;
