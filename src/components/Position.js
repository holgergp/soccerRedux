import React, { PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import Team from './Team';
import { ItemTypes } from './Constants';
import {swapPositionAction} from '../actions/index';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import { calculatePositionCssClass } from './TeamViewUtil';

import classNames  from 'classnames';

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


let Position = React.createClass({


  render: function () {

    const position = this.props.position;
    const team = this.props.position.team;
    const swapPosition = this.props.swapPosition;
    const { connectDropTarget } = this.props;
    const { connectDragSource } = this.props;
    const classes = classNames('col-md-12', 'btn', calculatePositionCssClass(position.positionNumber));
    return connectDropTarget(
      connectDragSource(
      <div>
        <span>
            <div className={ classes } style={{cursor: 'pointer'}}>
              <Team team={team} swapPosition={swapPosition} />
            </div>
        </span>
      </div>
      ));
  }
});


Position.propTypes = {
  position: PropTypes.object.isRequired,
  swapPosition: PropTypes.func,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};



const mapDispatchToProps = (dispatch) => {
  return {
    swapPosition: (sourceTeam, targetTeamId)=> {
      dispatch(swapPositionAction(sourceTeam, targetTeamId))
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

    //store.dispatch(swapPositionAction(sourceTeamId, dropResult.team.id))
    props.swapPosition(sourceTeamId, dropResult.team.id);

  }
};

let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Position);

let dragableComponent= flow(
  DragSource(ItemTypes.TEAM, teamSource, collectDragSource),
  DropTarget(ItemTypes.TEAM, positionTarget, collectDropTarget))(Position);


export default connect(null, mapDispatchToProps)(dragableComponent);


