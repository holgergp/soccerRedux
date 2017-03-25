import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ContentEditable from  'react-wysiwyg';

import { updateTeamnameAction} from '../actions/index';

const propTypes = {

  team: PropTypes.object.isRequired,
  updateTeamname: PropTypes.func,

};


class TeamName extends React.Component {
  constructor(props) {
    super(props);
    this.updateTeamname = props.updateTeamname;

    this.team = this.props.team;

  }

  render() {
    const onChange = (text) =>{
      this.updateTeamname(this.team, text);
    };

    return ( <div>
      <ContentEditable
        tagName='div'
        onChange={onChange}
        className='textPointer'
        html={this.team.name}
        autofocus={true}
        maxLength={200}
        editing={this.team.editing}
        preventStyling
        noLinebreaks
      />
    </div>)
  }
};

TeamName.propTypes = propTypes;
const mapDispatchToProps = (dispatch) => {
  return {
    updateTeamname: (team, text) => {
      dispatch(updateTeamnameAction(team, text))
    },
  }
};

export default connect(null, mapDispatchToProps)(TeamName);
