import { DragSource } from 'react-dnd';
import React, { PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { calculatePositionCssClass } from './TeamViewUtil';
import { connect } from 'react-redux';

import TeamName from './TeamName';
import {swapPositionAction} from '../actions/index';
import classNames  from 'classnames';



/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */

const teamSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    return {sourceId: component.props.team.id};
  },

  endDrag(props, monitor) {
    //unused param component
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const sourceTeamId = monitor.getItem();
    const dropResult = monitor.getDropResult();


    props.swapPosition(sourceTeamId, dropResult.team.id);

  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {

  positionNumber: PropTypes.number.isRequired,
  team: PropTypes.object.isRequired,
  swapPosition: PropTypes.func,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};



class Team extends React.Component {
  constructor(props) {
    super(props);
    this.updateTeamname=props.updateTeamname;

    this.team = this.props.team;
  }
  render () {

    const positionNumber = this.props.positionNumber;


    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { connectDragSource } = this.props;
    const classes = classNames('col-md-12', 'btn', calculatePositionCssClass(positionNumber));
    return connectDragSource(
      <div className={ classes } style={{cursor: 'pointer'}}>
        <TeamName team={this.team} />
      </div>
    );

  }


}

Team.propTypes = propTypes;




export default DragSource(ItemTypes.TEAM, teamSource, collect)(Team);




