import React from 'react'
import { Navigation } from './Navigation'
import Team from '../components/Team'

const Teams = () => {
  return (
        <div>
            <Navigation/>
            <div className="App-header">
                <Team/>
            </div>
        </div>
  )
}
export default Teams
