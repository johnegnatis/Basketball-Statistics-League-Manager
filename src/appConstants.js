export const NAV = {
    INDEX: '/',
    STATS: '/stats',
    TEAMS: '/teams',
    getSingleTeamRoute: (teamName) => {
        return `/teams/${teamName.toLowerCase().replace(/\s/g, '')}`;
    }
}