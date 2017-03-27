/*eslint-disable no-unused-vars*/
import React from 'react'
  /*eslint-enable no-unused-vars*/;
import Position from './Position';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';



export const LeagueTable = (props) => {

  return (<div className="col-md-6">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Ligatabelle zum Selberstecken</h3>
        </div>
        <div className="panel-body">
          {props.positions.map((posIter) =>
            <Position position={posIter} key={posIter.team.id} />
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
