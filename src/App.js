import './App.scss'
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './pages/Landing'
import { NAV } from './appConstants'
import Stats from './pages/Stats'
import Teams from './pages/Teams'
import NotFound from './pages/NotFound'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path={NAV.STATS} element={<Stats />}/>
        <Route path={NAV.TEAMS} element={<Teams />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
