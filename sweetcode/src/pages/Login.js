import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CreateProfile from './CreateProfile' // Import CreateProfile component

const Login = ({ isOpen }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false) // Track profile modal open state

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.status === 200) {
        const responseData = await response.json()
        localStorage.setItem('token', responseData.token)
        navigate('/')
      } else if (response.status === 401) {
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Wrong username/password.')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Failed to login.')
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.')
    }
  }

  if (!isOpen) return null // If the modal is not open, do not render it

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold">Login</h2>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
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
            <button
              className="button2 bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-3">
            <p>
              Don't have an account?
              {/* Open CreateProfile Modal on click */}
              <button
                className="ml-2 text-blue-500 underline"
                onClick={() => setIsCreateProfileOpen(true)}
              >
                Create Profile
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* CreateProfile Modal */}
      <CreateProfile
        isOpen={isCreateProfileOpen}
        onClose={() => setIsCreateProfileOpen(false)}
      />
    </>
  )
}

export default Login
