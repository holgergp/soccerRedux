import Immutable from 'immutable'
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

  return position;
}
const defaultState = {
  positions: SAMPLE_LEAGUE_TABLE,
  newTeam: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'swapPositions':
      return swapPositions(state, action.sourceId, action.targetId);
    case 'updateTeamname':
      return updateTeamname(state, action.team, action.updatedText);
    default:
      return state
  }
}


