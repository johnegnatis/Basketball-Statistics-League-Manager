import React from 'react'
import { Navigation } from './Navigation'
import Team from '../components/Teams'

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
