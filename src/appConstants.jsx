/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { Message } from 'rsuite'

export const NAV = {
  INDEX: '/',
  STATS: '/stats',
  TEAMS: '/teams',
  getSingleTeamRoute: (teamName) => {
    return `/teams/${teamName.toLowerCase().replace(/\s/g, '')}`
  }
}

export const getMessage = {
  success: (msg) => { return <Message showIcon type="success">{msg}</Message> },
  warning: (msg) => { return <Message showIcon type="warning">{msg}</Message> },
  error: (msg) => { return <Message showIcon type="error">{msg}</Message> }
}

const trimURL = (url) => { return url.trim().replace(/ /g, '%20') }

export const getQuery = {
  getTeams: () => {
    return trimURL('http://localhost/nba/getTeams.php')
  },
  editTeam: (Name, No_trophy, Coach_name) => {
    return trimURL(`http://localhost/nba/editTeam.php?Name=${Name}&No_trophy=${No_trophy}&Coach_name=${Coach_name}`)
  },
  getTeamAndPlayers: (teamName) => {
    return trimURL(`http://localhost/nba/getTeamAndPlayer.php?Name=${teamName}`)
  }
}
