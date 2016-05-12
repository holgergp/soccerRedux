import React from 'react';
import Position from './Position';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import _ from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import { SAMPLE_LEAGUE_TABLE } from './Constants';


var LeagueTable = React.createClass({


  /**getInitialState: function () {
    const defaultState = {
      positions: SAMPLE_LEAGUE_TABLE,
      newTeam: {}
    };
    if (_.isUndefined(localStorage.state)) {
      return defaultState;

    }
    let localstate = JSON.parse(localStorage.state);

    if (_.isUndefined(localstate)) {
      return defaultState;
    }
    return localstate;

  },**/

  componentDidUpdate: function () {
    //unused params prevProps and prevState
    //localStorage.state = JSON.stringify(this.state);
  },



  render: function () {

    var positionNodes = this.state.positions.map(function (posIter) {
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


const mapStateToProps = function (positions) {
  return {
    positions
  };
};

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(LeagueTable));

