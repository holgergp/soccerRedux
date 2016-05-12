import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Team from './Team';
import { ItemTypes } from './Constants';

const positionTarget = {
  drop(props) {
    //unused params monitor, component
    return props.position.team;

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  };
}


let Position = React.createClass({


  render: function () {

    const position = this.props.position;
    const team = this.props.position.team;
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <span>
   <Team team={team} positionNumber={position.position} />
      </span>
      </div>
    );
  }
});


Position.propTypes = {
  position: PropTypes.object.isRequired
};

export default DropTarget(ItemTypes.TEAM, positionTarget, collect)(Position);




