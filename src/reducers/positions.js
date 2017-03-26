import { SAMPLE_LEAGUE_TABLE } from '../components/Constants';

//import shallowCompare from 'react-addons-shallow-compare' // ES6

function swapPositions(state, sourceTeamParam, targetTeamId) {

  const updatedPositions = state.positions.slice();

  //const sourcePositionNumber = findTeamPositionNumber(sourceTeamParam.sourceId, updatedPositions);
  //const targetPositionNumber = findTeamPositionNumber(targetTeamId, updatedPositions);

  const sourcePosition = findTeamPosition(sourceTeamParam.sourceId, updatedPositions);
  const targetPosition = findTeamPosition(targetTeamId, updatedPositions);

  const sourceTeam = findTeam(sourceTeamParam.sourceId, updatedPositions);
  const targetTeam = findTeam(targetTeamId, updatedPositions);

  const newTarget = { ...targetPosition,
    team: sourceTeam
  };

  const newSource = { ...sourcePosition,
    team: targetTeam
  };

  updatedPositions[targetPosition.positionNumber - 1] = newTarget;
  updatedPositions[sourcePosition.positionNumber - 1] = newSource;

  return updatedPositions;

}

function findTeamPosition(teamId, positions) {
  let foundPosition = positions.filter(function (posIter) {
    return posIter.team.id === teamId;
  }).pop();

  return foundPosition;
}

function findTeam(teamId, positions) {
  let foundPosition = positions.filter(function (posIter) {
    return posIter.team.id === teamId;
  }).pop();

  return foundPosition.team;
}


function updateTeamname(state, team, updatedText) {

  const positions = state.positions.slice();

  let position = findTeamPosition(team.id, positions);

  team.name = updatedText;

  positions[position - 1] = {
    position: position,
    team: team
  };

  return positions;
}
const defaultState = {
  positions: SAMPLE_LEAGUE_TABLE
};



export default (state = defaultState, action) => {
  switch (action.type) {
    case 'swapPositions': {
      const newPositions = swapPositions(state, action.sourceTeam, action.targetTeamId);
      const newState = {
        positions: newPositions
      };
      //const identical = shallowCompare(state, newState);
      return newState
    }

    case 'updateTeamname': {
      return {
        positions: updateTeamname(state, action.team, action.updatedText)
      }
    }
    default:
      return state
  }
}
