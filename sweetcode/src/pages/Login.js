import React, { useEffect, useState } from 'react'

function Login() {
  const [members, setMembers] = useState([])
  useEffect(() => {
    // Fetch the members from the Flask backend
    fetch('/members') // Ensure this URL points to your Flask backend
      .then((response) => response.json())
      .then((data) => setMembers(data.members))
      .catch((error) => console.error('Error fetching members:', error))
  }, [])
  return (
    <div className="bg-slate-500">
      <header>
        <p className="">LOGIN PAGE</p>
      </header>
      <h3>Here is the list of our members</h3>
      {/* <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default Login
