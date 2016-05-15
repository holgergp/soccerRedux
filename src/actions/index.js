export function swapPosition(sourceTeam, targetTeamId) {
  return {
    type: 'swapPositions',
    sourceTeam,
    targetTeamId
  }
}

export function updateTeamname(team, updatedText) {
  return {
    type: 'updateTeamname',
    team,
    updatedText
  }
}
