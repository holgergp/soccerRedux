export function swapPosition(sourceTeamId, targetTeamId) {
  return {
    type: 'swapPosition',
    sourceTeamId,
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
