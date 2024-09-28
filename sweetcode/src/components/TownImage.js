import React from 'react'
import { Link } from 'react-router-dom'

function TownImage({
  imgUrl,
  townName,
  top,
  left,
  route,
  setAreaText,
  areaText,
}) {
  const handleMouseEnter = () => {
    setAreaText(areaText)
  }

  const handleMouseLeave = () => {
    setAreaText('Choose a town to start!') // Reset to default or any other text
  }
  return (
    <div
      className="absolute"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <Link to={route} className="group">
        <img
          src={imgUrl}
          alt={townName}
          className="w-[480px] transition-transform duration-300 group-hover:-translate-y-5"
        />
      </Link>
    </div>
  )
}

export default TownImage
