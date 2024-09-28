// import React from 'react';  // Add this line
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home' // your Home component
import About from './pages/About' // your About component
import Login from './pages/Login' // your Login component
import NotFound from './pages/NotFound' // your NotFound component for 404

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
