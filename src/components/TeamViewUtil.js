export let calculatePositionCssClass = (positionNumber) =>{
  if (positionNumber === 1) {
    return 'tabellenfuehrerClass tabelleClass'
  }
  if (positionNumber <= 3) {
    return 'championsLeagueClass tabelleClass'
  }
  if (positionNumber <= 6) {
    return 'europaLeagueClass tabelleClass'
  }
  if (positionNumber <= 15) {
    return 'mittelfeldClass tabelleClass'
  }
  if (positionNumber === 16) {
    return 'relegationClass tabelleClass'
  }
  else {
    return 'abstiegClass tabelleClass'
  }
};
