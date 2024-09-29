import React from 'react'

function HintBit({ hint, onToggleHint, showHint, townNumber }) {
  const imgsrc = '/img/' + townNumber + '.PNG'

  return (
    <div className="p-4 absolute bottom-4 flex gap-4">
      <button onClick={onToggleHint} className="w-[250px]">
        <img
          src={imgsrc}
          alt=""
          className="w-full transition-transform transform hover:-translate-y-3"
        />
      </button>
      <div className="m-1 p-4 h-1/2 bg-white text-sm rounded-xl w-[355px]">
        <p>
          Hi! I'm Remy the Raccoon. Welcome to Tree Town! <br></br>Our villagers
          always love some help, and I see you want some practice!. Lucky for
          you, I know these trees pretty well. If you ever need help, click me
          for a hint!
        </p>
        {/* Display the hint if showHint is true */}
        {showHint && <p className="mt-2 font-bold">{hint}</p>}{' '}
      </div>
    </div>
  )
}

export default HintBit
