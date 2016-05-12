require('normalize.css');
require('styles/App.css');
import Provider from 'react-redux';

import React from 'react';
import LeagueTable from './LeagueTable';
import store from '../store';

let AppComponent = React.createClass({
  render: function () {
    return (
      <Provider store={store}>
        <div className="index">
          <div className="container">
            <div className="row">
              <LeagueTable  />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
});

AppComponent.defaultProps = {};

export default AppComponent;
