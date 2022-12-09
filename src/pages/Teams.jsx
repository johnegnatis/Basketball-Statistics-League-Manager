import React from 'react'
import { Navigation } from './Navigation'
import Team from '../components/Teams'

const Teams = () => {
  return (
    <div>
      <Navigation header="teams"/>
      <div className="App-header">
        <Team/>
      </div>
    </div>
  )
}
export default Teams
