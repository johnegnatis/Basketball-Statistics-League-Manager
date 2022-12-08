import React from 'react'
import { useLocation } from 'react-router-dom'

import DisplayPlayer from '../components/IndividualPlayer'
import { Navigation } from './Navigation'

const IndividualPlayer = () => {
  const params = useLocation() // this will give us the name of the player we have queried for
  return (
    <div>
      <Navigation header={`${params.state.Fname} ${params.state.Lname}`}/>
      <div className="App-header">
        <DisplayPlayer player={params.state}/>
      </div>
    </div>
  )
}

export default IndividualPlayer
