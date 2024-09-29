import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Nav({ titleText }) {
  return (
    <div className="w-full h-[32px] bg-beige flex justify-between p-4 font-mono">
      <Link to="/">← Back</Link>
      <h4 className="uppercase">{titleText}</h4>
      <Link to="/landing">Logout →</Link>
    </div>
  )
}

export default Nav
