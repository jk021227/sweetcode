import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProfile = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/createprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, username, password }),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);
        navigate('/');
      } else if (response.status === 409) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'User already exists.');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create profile.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold">Create Profile</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input border p-2 w-full my-2"
            name="nickname"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <input
            type="text"
            className="input border p-2 w-full my-2"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input border p-2 w-full my-2"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}  // Close modal
              type="button"
            >
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
