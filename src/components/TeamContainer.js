import React, { PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import Team from './Team';
import { ItemTypes } from './Constants';
import {swapPositionAction} from '../actions/index';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import store from '../store';

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

function collectDropTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  };
}

function collectDragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


let TeamContainer = React.createClass({


  render: function () {

    const position = this.props.position;
    const team = this.props.position.team;
    const swapPosition = this.props.swapPosition;
    const { connectDropTarget } = this.props;
    const { connectDragSource } = this.props;
    return connectDropTarget(
      connectDragSource(
      <div>
        <span>
            <Team team={team} positionNumber={position.position} swapPosition={swapPosition} />
        </span>
      </div>
      ));
  }
});


TeamContainer.propTypes = {
  position: PropTypes.object.isRequired,
  swapPosition: PropTypes.func,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};



const mapDispatchToProps = (dispatch) => {
  return {
    swapPosition: (sourceTeam, targetTeamId)=> {
      store.dispatch(swapPositionAction(sourceTeam, targetTeamId))
    }
  }
};

const mapStateToProps = function (state) {
  return {
    positions: state.positions
  }
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */

const teamSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    return {sourceId: props.position.team.id};
  },

  endDrag(props, monitor) {
    //unused param component
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const sourceTeamId = monitor.getItem();
    const dropResult = monitor.getDropResult();

    store.dispatch(swapPositionAction(sourceTeamId, dropResult.team.id))
    //props.swapPosition(sourceTeamId, dropResult.team.id);

  }
};

let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(TeamContainer);

let draganbleComponent= flow(
  DragSource(ItemTypes.TEAM, teamSource, collectDragSource),
  DropTarget(ItemTypes.TEAM, positionTarget, collectDropTarget))(TeamContainer);


export default connect(null, mapDispatchToProps)(draganbleComponent);


