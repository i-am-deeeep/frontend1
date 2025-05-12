import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Shows from './pages/Shows'
import Platforms from './pages/Platforms'
import ShowDetails from './pages/ShowDetails'
import PlatformDetails from './pages/PlatformDetails'

function App() {
  return (
    <div>
      <BrowserRouter>
      <nav>
        <ul>
          <li> 
            <Link to="/shows">Shows</Link>
          </li>
          <li>
            <Link to="/platforms">Platforms</Link>
          </li>
        </ul>
      </nav>
        <Routes>
            <Route path="/shows" element={<Shows/>} />
            <Route path="/platforms" element={<Platforms/>} />
            <Route path="/platforms/:id" element={<PlatformDetails/>} />
            <Route path="/shows/:id" element={<ShowDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App