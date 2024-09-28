import React from 'react'

function Module({ moduleName, moduleID, onClick }) {
  // Generate a random hue value between 0 and 360
  const hueNum = moduleID * 60
  // Create a style object with the hue rotation
  const imageStyle = {
    filter: `hue-rotate(${hueNum}deg)`,
  }
  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-yellow-100 cursor-pointer rounded-md"
    >
      <img
        src="/img/1-tree/tree.PNG"
        alt=""
        style={imageStyle} // Apply the random hue rotation here
      />
      <h3 className="text-lg font-semibold text-center">{moduleName}</h3>
    </div>
  )
}

export default Module
