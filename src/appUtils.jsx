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
  success: (msg) => {
    return <Message showIcon
      type="success">{msg}</Message>
  },
  warning: (msg) => {
    return <Message showIcon
      type="warning">{msg}</Message>
  },
  error: (msg) => {
    return <Message showIcon
      type="error">{msg}</Message>
  }
}

const trimURL = (url) => { return url.trim().replace(/ /g, '%20') }

export const getQuery = {
  getTeams: () => {
    return trimURL('http://localhost/nba/getTeams.php')
  },
  editTeam: (Name, No_trophy, Coach_name) => {
    return trimURL(`http://localhost/nba/editTeam.php?Name=${Name}&No_trophy=${No_trophy}&Coach_name=${Coach_name}`)
  },
  getPlayers: (teamName) => {
    return trimURL(`http://localhost/nba/getPlayers.php?Name=${teamName}`)
  },
  getTeamStats: (Name, Start_date = '1900-1-1', End_date = '3000-1-1') => {
    return trimURL(`http://localhost/nba/getTeamStats.php?Name=${Name}&Start_date=${Start_date}&End_date=${End_date}`)
  },
  getOverallStats: () => {
    return trimURL('http://localhost/nba/getOverallStats.php')
  }
}

export const toPercent = (decimal) => {
  return `${Math.round(decimal * 100)}%`
}

export function formatDate (d) {
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) { month = '0' + month }
  if (day.length < 2) { day = '0' + day }

  return [year, month, day].join('-')
}
