import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import TreeTown from './towns/TreeTown'
import NotFound from './pages/NotFound'
import React from 'react'
import { useEffect, useState } from 'react'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        {/* Routes to Towns Below */}
        <Route path="/treetown" element={<TreeTown />} />
      </Routes>
    </Router>
  )
}

export default App
