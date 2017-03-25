export function swapPositionAction(sourceTeam, targetTeamId) {
  return {
    type: 'swapPositions',
    sourceTeam,
    targetTeamId
  }
}

export function updateTeamnameAction(team, updatedText) {
  return {
    type: 'updateTeamname',
    team,
    updatedText
  }
}
