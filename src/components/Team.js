import { DragSource } from 'react-dnd';
import React, { PropTypes } from 'react';
import { ItemTypes } from './Constants';

import store from '../store';
import {swapPosition, updateTeamname} from '../actions/index';
import classNames  from 'classnames';

import ContentEditable from  'react-wysiwyg';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */

//TODO hgp kriegen wir das DragUndDrop auch noch irgendwie raus? Vielleicht auch eine Sache für den Container Component Umbau
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
    const sourceTeam = monitor.getItem();
    const targetTeam = monitor.getDropResult();

    store.dispatch(swapPosition(sourceTeam, targetTeam.id))

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

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

//TODO hgp das muss auch raus
function calculatePositionCssClass(positionNumber) {
  if (positionNumber === 1) {
    return 'tabellenfuehrerClass tabelleClass'
  }
  if (positionNumber <= 3) {
    return 'championsLeagueClass tabelleClass'
  }
  if (positionNumber <= 6) {
    return 'europaLeagueClass tabelleClass'
  }
  if (positionNumber <= 15) {
    return 'mittelfeldClass tabelleClass'
  }
  if (positionNumber === 16) {
    return 'relegationClass tabelleClass'
  }
  else {
    return 'abstiegClass tabelleClass'
  }
}

var Team = React.createClass({


  render: function () {

    const positionNumber = this.props.positionNumber;
    const team = this.props.team;
    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { connectDragSource } = this.props;
    const classes = classNames('col-md-12', 'btn', calculatePositionCssClass(positionNumber));
    return connectDragSource(
      <div className={ classes } style={{cursor: 'pointer'}}>
        <div>
          <ContentEditable
            tagName='div'
            onChange={onChange}
            className='textPointer'
            html={team.name}
            autofocus={true}
            maxLength={200}
            editing={this.props.team.editing}
            preventStyling
            noLinebreaks
          />
        </div>
      </div>
    );

    function onChange(text) {
      store.dispatch(updateTeamname(team, text));
    }
  }
});

Team.propTypes = propTypes;

export default DragSource(ItemTypes.TEAM, teamSource, collect)(Team);




