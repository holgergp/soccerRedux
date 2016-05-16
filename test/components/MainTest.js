/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';
import configureStore from 'redux-mock-store';
import AppComponent from 'components/App';


import {LeagueTable} from 'components/LeagueTable';
import  { SAMPLE_LEAGUE_TABLE }  from 'components/Constants';

import { wrap } from 'react-stateless-wrapper'


/**function setup() {
  const mockStore = configureStore();
  let props = {
    store: mockStore
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<LeagueTable {...props} />)
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}
 **/
describe('MainComponent', () => {
  let AppComponentCreated;

  beforeEach(() => {
    AppComponentCreated = createComponent(AppComponent);
  });

  it('should have its component name as default className', () => {
    expect(AppComponentCreated.props.store).to.exist;
  });
});

describe('LeagueTable', () => {
  let LeagueTableCreated;

  beforeEach(() => {
    LeagueTableCreated = createComponent(LeagueTable);
  });

  it('should have display 18 different clubs', () => {
    let WrappedComponent = wrap(LeagueTable);
    const mockState={
      positions: []

    };
    let root = TestUtils.renderIntoDocument(
      <WrappedComponent state={mockState}/>
    );


    /**
     let root = TestUtils.renderIntoDocument(
     <LeagueTable />
     );**/
    let div = TestUtils.scryRenderedDOMComponentsWithClass(root, 'tabelleClass');

    expect(div.length).to.equal(18);

  });

  //FIXME hgp This should be a reducer test!

  /**
   it('should swap two clubs', () => {

    let root  = TestUtils.renderIntoDocument(<LeagueTable  />);

    let oldFirst = root.refs.child.state.positions[0];
    let oldSecond = root.refs.child.state.positions[1];

    root.refs.child.swapPositions({sourceId:'BMG'},"BVB");

    let newFirst = root.refs.child.state.positions[0];
    let newSecond = root.refs.child.state.positions[1];
    expect(oldFirst.team.id). to.equal(newSecond.team.id);
    expect(oldSecond.team.id). to.equal(newFirst.team.id);

  });
   **/
});


