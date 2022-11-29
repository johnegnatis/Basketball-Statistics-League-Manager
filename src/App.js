import './App.scss'
import 'rsuite/dist/rsuite.min.css'
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './pages/Landing'
import { NAV } from './appUtils'
import Stats from './pages/Stats'
import Teams from './pages/Teams'
import NotFound from './pages/NotFound'
import IndividualTeam from './pages/IndividualTeam'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index
          element={<LandingPage/>} />
        <Route path={NAV.STATS}
          element={<Stats />}/>
        <Route path={NAV.TEAMS}
          element={<Teams />}/>
        <Route path={`${NAV.TEAMS}/:teamName`}
          element = {<IndividualTeam /> } />
        <Route path="*"
          element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
