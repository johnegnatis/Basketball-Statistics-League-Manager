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
import IndividualPlayer from './pages/IndividualPlayer'
import { CustomProvider } from 'rsuite'

function App () {
  return (
    <CustomProvider theme="dark">
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
          <Route path={`${NAV.STATS}/:player`}
            element = {<IndividualPlayer /> } />
          <Route path="*"
            element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </CustomProvider>
  )
}

export default App
