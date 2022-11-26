import React from 'react'
import { Link } from 'react-router-dom'
import { NAV } from '../appConstants'

export const Navigation = () => {
  return (
        <nav>
            <ul>
                <li>
                    <Link className="no-dec" to={NAV.INDEX}>Home</Link>
                </li>
                <li>
                    <Link className="no-dec" to={NAV.STATS}>Stats</Link>
                </li>
                <li>
                    <Link className="no-dec" to={NAV.TEAMS}>Teams</Link>
                </li>
            </ul>
        </nav>
  )
}
