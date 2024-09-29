import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import TreeTown from './towns/TreeTown'
import NotFound from './pages/NotFound'
import CreateProfile from './pages/CreateProfile'
import Landing from './pages/Landing'
import Logout from './pages/Logout'; 
import InterviewIsle from './towns/InterviewIsle'
import ProtectedRoute from './utils/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React from 'react'

function App() {
  return (
    <>
    <Helmet><script src="https://cdn.tailwindcss.com"></script></Helmet>
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="*" element={<NotFound />} />
        {/* Routes to Towns Below */}
        <Route path="/treetown" element={<TreeTown />} />
        <Route path="/interview" element={<InterviewIsle />} />
      </Routes>
    </Router>
    </>
  );
}
export default App
