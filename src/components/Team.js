import React, { PropTypes } from 'react';
import { calculatePositionCssClass } from './TeamViewUtil';

import TeamName from './TeamName';

import classNames  from 'classnames';


const propTypes = {

  positionNumber: PropTypes.number.isRequired,
  team: PropTypes.object.isRequired,

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
    const classes = classNames('col-md-12', 'btn', calculatePositionCssClass(positionNumber));
    return (
      <div className={ classes } style={{cursor: 'pointer'}}>
        <TeamName team={this.team} />
      </div>
    );

  }


}

Team.propTypes = propTypes;




export default Team;




