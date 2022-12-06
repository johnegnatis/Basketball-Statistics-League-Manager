import React from 'react'
import { Navigation } from './Navigation'

const LandingPage = () => {
  return (
    <div>
      <Navigation/>
      <div className="App-header landing">
        <h1>
          NBA Project
        </h1>
        <ul>
          <li>John Egnatis</li>
          <li>Eton Weber</li>
          <li>Gia Tran</li>
          <li>Peyton Walker</li>
          <li>Luke Tran</li>
        </ul>
      </div>
    </div>
  )
}
export default LandingPage
