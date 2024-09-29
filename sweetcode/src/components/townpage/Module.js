import React from 'react'

function Module({ moduleName, moduleID, onClick, townNumber }) {
  const hueNum = moduleID * 60
  const imgSrc = '/img/sprites/' + townNumber + '.PNG'

  // const imgSrc = '/img/sprite/' + townNumber + '.PNG'
  const imageStyle = {
    filter: `hue-rotate(${hueNum}deg)`,
  }
  return (
    <div
      onClick={onClick}
      className="px-4 py-1 hover:bg-yellow-100 cursor-pointer rounded-md"
    >
      <img
        src={imgSrc}
        alt=""
        style={imageStyle} // Apply the random hue rotation here
      />
      <h3 className="text-sm uppercase text-center">{moduleName}</h3>
    </div>
  )
}

export default Module
