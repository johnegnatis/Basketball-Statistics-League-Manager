import React from 'react'
import { useParams } from 'react-router-dom'
import DisplayTeam from '../components/IndividualTeam'
import { Navigation } from './Navigation'

const IndividualTeam = () => {
  const params = useParams() // this will give us the name of the team we have queried for

  return (
    <div>
        <Navigation />
        <div className="App-header">
            <DisplayTeam teamName={params.teamName}/>
        </div>
    </div>
  )
}

export default IndividualTeam
