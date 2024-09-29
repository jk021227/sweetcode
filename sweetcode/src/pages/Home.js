import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TownImage from '../components/TownImage.js'

function Home() {
  const [areaText, setAreaText] = useState('Choose a town to start!')
  const [towns, setTowns] = useState([])

  // Fetching the towns from the JSON file
  useEffect(() => {
    const fetchTowns = async () => {
      const response = await fetch('/data/towns.json')
      const data = await response.json()
      setTowns(data)
    }
    fetchTowns()
  }, [])

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/landing'); // Redirect to login page
  };

  return (
    <div className="font-mono">
      <div className="mx-auto mt-10 w-100 text-center">
        <p className="mb-6">Welcome to Sweetcode!</p>
        <h1 className="areaText text-3xl">{areaText}</h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
        >
          Logout
        </button>
      </div>
      <div>
        <div className="w-full overflow-hidden">
          <img
            src="/img/islands/river.PNG"
            alt=""
            className="absolute top-[254px] left-[549px] w-[330px] z-0"
          />
          {towns.map((town, index) => (
            <TownImage
              key={index} // You can use a unique identifier if available
              imgUrl={town.imgUrl}
              color={town.color}
              areaText={town.townName}
              top={town.top}
              left={town.left}
              route={town.route}
              setAreaText={setAreaText}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
