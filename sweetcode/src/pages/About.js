import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="bg-slate-500">
      <p>ABOUT</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default About
