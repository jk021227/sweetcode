import React from 'react'
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

  return (
    <div className="font-mono">
      <div className="mx-auto mt-20 w-100 text-center">
        <p className="mb-6">Welcome to Sweetcode!</p>
        <h1 className="areaText text-3xl">{areaText}</h1>
      </div>
      <div>
        <div className="w-full overflow-hidden">
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
          <img
            src="/img/islands/river.PNG"
            alt=""
            className="absolute top-[256px] left-[514px] w-[409px] -z-50"
          />
        </div>

        {/* <img
          src="/img/island.PNG"
          alt="island"
          className="px-8 w-full pt-[4%] h-auto ml-8 relative -z-0
          "
        /> */}
      </div>
    </div>
  )
}

export default Home
