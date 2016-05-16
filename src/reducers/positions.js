import { SAMPLE_LEAGUE_TABLE } from '../components/Constants';


function swapPositions(state, sourceTeamParam, targetTeamId) {

  const updatedPositions = state.positions.slice();

  const sourcePosition = findTeamPosition(sourceTeamParam.sourceId, updatedPositions);
  const targetPosition = findTeamPosition(targetTeamId, updatedPositions);

  const sourceTeam = findTeam(sourceTeamParam.sourceId, updatedPositions);
  const targetTeam = findTeam(targetTeamId, updatedPositions);

  const newTarget = {
    position: targetPosition,
    team: sourceTeam
  };

  const newSource = {
    position: sourcePosition,
    team: targetTeam
  };

  updatedPositions[targetPosition - 1] = newTarget;
  updatedPositions[sourcePosition - 1] = newSource;


  return updatedPositions;

}

function findTeamPosition(teamId, positions) {
  let foundPosition = positions.filter(function (posIter) {
    return posIter.team.id === teamId;
  }).pop();

  return foundPosition.position;
}

function findTeam(teamId, positions) {
  let foundPosition = positions.filter(function (posIter) {
    return posIter.team.id === teamId;
  }).pop();

  return foundPosition.team;
}


function updateTeamname(state, team, updatedText) {

  const positions = state.positions.slice();

  var position = findTeamPosition(team.id, positions);

  team.name = updatedText;

  positions[position - 1] = {
    position: position,
    team: team
  };

  return positions;
}
const defaultState = {
  positions: SAMPLE_LEAGUE_TABLE,
  newTeam: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'swapPositions':
      var swapppedPositions = swapPositions(state, action.sourceTeam, action.targetTeamId);
      return {
        positions: swapppedPositions,
        newTeam: {}
      };

    case 'updateTeamname':
      var updatedTeamname = updateTeamname(state, action.team, action.updatedText);
      return {
        positions: updatedTeamname,
        newTeam: {}
      };
    default:
      return state
  }
}


