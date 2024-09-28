import React, { useState } from 'react'

const CreateProfile = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent the default form submission

    try {
      const response = await fetch('http://localhost:5001/createprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message) // Profile created successfully
        setError('') // Clear any previous error messages
      } else {
        setError(data.error) // Display error message
        setMessage('') // Clear any previous success messages
      }
    } catch (err) {
      setError('An error occurred while creating the profile.') // Handle fetch error
      setMessage('') // Clear any previous success messages
    }
  }

  return (
    <div className="create-profile">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Login
