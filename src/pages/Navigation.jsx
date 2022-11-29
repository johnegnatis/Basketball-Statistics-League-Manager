import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NAV } from '../appUtils'
import Basketball from '../images/basketball.svg'

export const Navigation = () => {
  const navigate = useNavigate()

  return (
    <nav>
      <img src={Basketball}
        alt="basketball"
        height='40px'/>
      <ul>
        <li onClick={() => navigate(NAV.INDEX)}>
          Home
        </li>
        <li onClick={() => navigate(NAV.STATS)}>
          Stats
        </li>
        <li onClick={() => navigate(NAV.TEAMS)}>
          Teams
        </li>
      </ul>
    </nav>
  )
}
