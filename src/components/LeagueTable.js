import React from 'react';
import Position from './Position';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import _ from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import { SAMPLE_LEAGUE_TABLE } from './Constants';


export const LeagueTable = (state, dispatch) => {
  console.log(state);
  console.log(state.positions);
  console.log(state.positions.map);
  return (<div className="col-md-6">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Ligatabelle zum Selberstecken</h3>
        </div>
        <div className="panel-body">
          {state.positions.map((posIter) =>
            <Position position={posIter} key={posIter.position}/>
          )}
        </div>
      </div>
    </div>
  )
} ;

const mapStateToProps = function (state) {
  return {
    positions: state.positions
  }
};

let connectedComponent = connect(mapStateToProps)(LeagueTable);

export default DragDropContext(HTML5Backend)(connectedComponent);
