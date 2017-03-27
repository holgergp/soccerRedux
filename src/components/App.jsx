require('normalize.css');
require('styles/App.css');
import { Provider } from 'react-redux'

/*eslint-disable no-unused-vars*/
import React from 'react'
  /*eslint-enable no-unused-vars*/;
import LeagueTable from './LeagueTable';
import store from '../store';

const AppComponent = () => (

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


AppComponent.defaultProps = {};

export default AppComponent;
