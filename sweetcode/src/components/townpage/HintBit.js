import React from 'react'

function HintBit({ hint, onToggleHint, showHint, townNumber }) {
  const imgsrc = '/img/characters/' + townNumber + '.PNG'
  console.log("BOOS", imgsrc)

  return (
    <div className="p-4 absolute bottom-20 flex gap-4 align-bottom h-[250px]">
      <button onClick={onToggleHint} className="w-[200px]">
        <img
          src={imgsrc}
          alt=""
          className="w-full transition-transform transform hover:-translate-y-3"
        />
      </button>
      <div className="p-4 bg-white text-sm rounded-xl w-[355px]">
        <p>
          Hi! Our villagers always love some help, and I see you want some practice! If you ever need help, click me
          for a hint!
        </p>
        {/* Display the hint if showHint is true */}
        {showHint && <p className="mt-2 font-bold">{hint}</p>}{' '}
      </div>
    </div>
  )
}

export default HintBit
