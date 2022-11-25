/* eslint-disable camelcase */
export const NAV = {
  INDEX: '/',
  STATS: '/stats',
  TEAMS: '/teams',
  getSingleTeamRoute: (teamName) => {
    return `/teams/${teamName.toLowerCase().replace(/\s/g, '')}`
  }
}

export const EditType = {
  coach: 'Coach_name',
  trophy: 'No_trophy'
}

export const getQuery = {
  getTeams: () => { return 'http://localhost/nba/getTeams.php' },
  editTeam: (Name, No_trophy, Coach_name) => { return `http://localhost/nba/editTeam.php?Name=${Name}&No_trophy=${no_trophy}&Coach_name=${coach_name}` }
}
