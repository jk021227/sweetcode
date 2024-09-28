import React, { useEffect, useState } from 'react'

function Home() {
  const [members, setMembers] = useState([])
  useEffect(() => {
    // Fetch the members from the Flask backend
    fetch('/members') // Ensure this URL points to your Flask backend
      .then((response) => response.json())
      .then((data) => setMembers(data.members))
      .catch((error) => console.error('Error fetching members:', error))
  }, [])
  return (
    <div className="bg-slate-500 font-mono">
      <header>
        <p className="">
          Hello there! This is a simple React app that fetches data from a Flask
          backend.
        </p>
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

export default Home
