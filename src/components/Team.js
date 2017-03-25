import React, { PropTypes } from 'react';


import TeamName from './TeamName';



const propTypes = {

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

    return (
      <div>
        <TeamName team={this.team} />
      </div>
    );

  }

}

Team.propTypes = propTypes;


export default Team;




