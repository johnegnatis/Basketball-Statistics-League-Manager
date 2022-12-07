import React from 'react'
import { Navigation } from './Navigation'
import Players from '../images/players.svg'

const LandingPage = () => {
  return (
    <div className="App">
      <Navigation/>
      <div className="App-header landing">
        <h1>
          Basketball League Statistics Application
        </h1>
        <ul>
          <li>John Egnatis - Eton Weber - Gia Tran - Peyton Walker - Luke Tran</li>
        </ul>

        <div className='image'>
          <img src={Players}
            alt='basketball-players'
            width="200"/>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
