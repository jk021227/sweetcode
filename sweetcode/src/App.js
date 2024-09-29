import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import TownPage from './towns/TownPage'
import NotFound from './pages/NotFound'
import CreateProfile from './pages/CreateProfile'
import Landing from './pages/Landing'
import Logout from './pages/Logout'
import InterviewIsle from './towns/InterviewIsle'
import ProtectedRoute from './utils/ProtectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react'

function App() {
  return (
    <>
      <Helmet>
        <script src="https://cdn.tailwindcss.com"></script>
      </Helmet>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/landing" element={<Landing />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="*" element={<NotFound />} />
          {/* Routes to Towns Below */}
          <Route path="/treetown" element={<TownPage townNumber="1" />} />
          <Route path="/graphgrove" element={<TownPage townNumber="2" />} />
          <Route
            path="/arrayarchipelago"
            element={<TownPage townNumber="3" />}
          />
          <Route path="/recursionridge" element={<TownPage townNumber="4" />} />
          <Route path="/sortingsavanna" element={<TownPage townNumber="5" />} />
          <Route
            path="/pathfindingprairie"
            element={<TownPage townNumber="6" />}
          />

          <Route path="/interview" element={<InterviewIsle />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
