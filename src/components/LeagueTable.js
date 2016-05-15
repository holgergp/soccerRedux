import React from 'react';
import Position from './Position';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import _ from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import { SAMPLE_LEAGUE_TABLE } from './Constants';

var LeagueTable =
//TODO hgp React component as function

  React.createClass({

    render: function () {

      var positionNodes = this.props.positions.map(function (posIter) {
        return (
          <Position position={posIter} key={posIter.position}/>
        );
      });

      return (
        <div className="col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Ligatabelle zum Selberstecken</h3>
            </div>
            <div className="panel-body">
              {positionNodes}
            </div>
          </div>
        </div>
      );
    }
  });


const mapStateToProps = function (state) {
  return {
    positions: state.positions
  }

};

let connectedComponent = connect(mapStateToProps)(LeagueTable);

export default DragDropContext(HTML5Backend)(connectedComponent);
