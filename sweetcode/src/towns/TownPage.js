import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav.js'
import LeftField from '../components/townpage/LeftField'
import RightField from '../components/townpage/RightField'

function TownPage({ townNumber, townName }) {
  const [towns, setTowns] = useState([])

  return (
    <div className="">
      <Nav titleText={townName} />
      <div className="p-4 flex">
        {/* Add padding for some spacing */}
        <div className="flex w-full">
          {/* LeftField takes up the entire left side */}
          <div className="w-1/2">
            <LeftField townNumber={townNumber} />
          </div>
          <div className="w-1/2">
            <RightField townNumber={townNumber} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TownPage
