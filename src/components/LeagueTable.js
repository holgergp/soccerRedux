import React from 'react';
import TeamContainer from './TeamContainer';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import {swapPositionAction} from '../actions/index';
import HTML5Backend from 'react-dnd-html5-backend';



export const LeagueTable = (props) => {

  return (<div className="col-md-6">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Ligatabelle zum Selberstecken</h3>
        </div>
        <div className="panel-body">
          {props.positions.map((posIter) =>
            <TeamContainer position={posIter} key={posIter.position} swapPosition={props.swapPosition}/>
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
