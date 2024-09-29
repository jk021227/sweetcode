import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import LeftField from '../components/townpage/LeftField'
import RightField from '../components/townpage/RightField'

function TreeTown() {
  return (
    <div className="">
      <Nav titleText="Tree Town" />
      <div className="p-4 flex">
        {/* Add padding for some spacing */}
        <div className="flex w-full">
          {/* LeftField takes up the entire left side */}
          <div className="w-1/2">
            <LeftField />
          </div>
          <div className="w-1/2">
            <RightField />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreeTown
