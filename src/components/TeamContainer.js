import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Team from './Team';
import { ItemTypes } from './Constants';
import {swapPositionAction} from '../actions/index';
import { connect } from 'react-redux';

const positionTarget = {
  drop(props) {
    //unused params monitor, component
    //This provides props for endDrag
    //This Object seems to miss the funcs passed via redux ...
    return {
      team: props.position.team,
      swapPosition: props.swapPosition
    };

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  };
}


let TeamContainer = React.createClass({


  render: function () {

    const position = this.props.position;
    const team = this.props.position.team;
    const swapPosition = this.props.swapPosition;
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <span>
            <Team team={team} positionNumber={position.position} swapPosition={swapPosition} />
        </span>
      </div>
    );
  }
});


TeamContainer.propTypes = {
  position: PropTypes.object.isRequired,
  swapPosition: PropTypes.func,

};

const mapDispatchToProps = (dispatch) => {
  return {
    swapPosition: (sourceTeam, targetTeamId)=> {
      dispatch(swapPositionAction(sourceTeam, targetTeamId))
    }
  }
};

let connectedComponent = connect(null, mapDispatchToProps)(TeamContainer);

export default DropTarget(ItemTypes.TEAM, positionTarget, collect)(connectedComponent);




