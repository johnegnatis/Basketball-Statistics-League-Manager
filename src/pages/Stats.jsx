import React from 'react'
import { Navigation } from './Navigation'
import StatsComponent from '../components/Stats'

const Stats = () => {
  return (
    <div>
      <Navigation/>
      <div className="App-header">
        <StatsComponent/>
      </div>
    </div>
  )
}
export default Stats
