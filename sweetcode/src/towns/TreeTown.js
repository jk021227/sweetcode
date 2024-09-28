import React from 'react'
import { Link } from 'react-router-dom'
import LeftField from '../components/townpage/LeftField'
import RightField from '../components/townpage/RightField'

function TreeTown() {
  return (
    <div className="p-4">
      {' '}
      {/* Add padding for some spacing */}
      <Link to="/" className="mb-4 inline-block text-blue-500">
        Back
      </Link>
      <div className="flex w-full">
        <div className="w-1/2 pr-2">
          {' '}
          {/* LeftField takes up 50% */}
          <LeftField />
        </div>
        <div className="w-1/2 pl-2">
          {' '}
          {/* RightField takes up 50% */}
          <RightField />
        </div>
      </div>
    </div>
  )
}

export default TreeTown
