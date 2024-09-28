// import React from 'react';  // Add this line
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home' // your Home component
import About from './pages/About' // your About component
import Login from './pages/Login' // your Login component
import NotFound from './pages/NotFound' // your NotFound component for 404

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Hello Sweetcoders...Happy Hacking! <span>😊</span></code>
        </p>
      </header>
      <h3>Here is the list of our members</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
