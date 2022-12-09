/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { Message } from 'rsuite'

export const NAV = {
  INDEX: '/',
  STATS: '/stats',
  TEAMS: '/teams',
  getSingleTeamRoute: (teamName) => {
    return `/teams/${teamName.toLowerCase().replace(/\s/g, '')}`
  },
  getPlayerRoute: (Fname, Lname) => {
    return `/stats/${Fname}${Lname}`
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
  getOverallStats: (search = '', ordering = '') => {
    let http = 'http://localhost/nba/getOverallStats.php'
    if (search) http += `?Search=${search}`
    if (!search && ordering) {
      http += `?Order=${ordering}`
    } else if (ordering) {
      http += `&Order=${ordering}`
    }
    return trimURL(http)
  },
  getPlayerStats: (SSN, Start_date = '1900-1-1', End_date = '3000-1-1') => {
    return trimURL(`http://localhost/nba/getPlayerStats.php?SSN=${SSN}&Start_date=${Start_date}&End_date=${End_date}`)
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

export const orderingMapping = [ // these index numbers are sent to backend to know which sort to do
  'None', // 0
  'Best FT Percentage', // 1
  'Best FG Percentage', // 2
  'Best Three Point Percentage', // 3
  'Most Undervalued Players', // 4
  'Most Valuable Short Players', // 5
  'Slimmest Players (BMI)', // 6
  'Heaviest Players (BMI)', // 7
  'Most Improved Players' // 8
]
