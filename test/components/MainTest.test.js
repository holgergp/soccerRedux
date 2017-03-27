/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import TestUtils from 'react-addons-test-utils';
import React  from 'react';
import createComponent from 'helpers/shallowRenderHelper';
import { Provider } from 'react-redux'

jest.mock("../../src/store.js");
import AppComponent from 'components/App';
import LeagueTable from 'components/LeagueTable';
import {LeagueTable as UnconnectedLeagueTable} from 'components/LeagueTable';
import  { SAMPLE_LEAGUE_TABLE }  from 'components/Constants';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';

import { wrap } from 'react-stateless-wrapper'


/**
 * Mock out the top level Redux store with all the required
 * methods and have it return the provided state by default.
 * @param {Object} state State to populate in store
 * @return {Object} Mock store
 */
function createMockStore(state) {
  return {
    subscribe: () => {
    },
    dispatch: () => {
    },
    getState: () => {
      return {...state};
    }
  };
}


describe('MainComponent', () => {
  let AppComponentCreated;
  beforeEach(() => {
    AppComponentCreated = createComponent(AppComponent);
  });

  it('should have a created store available', () => {
    expect(AppComponentCreated.props.store).toBeDefined();
  });
});

describe('LeagueTable', () => {
  let LeagueTableCreated;

  beforeEach(() => {
    LeagueTableCreated = createComponent(LeagueTable);
  });

  it('should have display 18 different clubs', () => {
    const mockStore = createMockStore({positions: SAMPLE_LEAGUE_TABLE});
    //TODO hgp Mockstore should not be neccesary
    let root = TestUtils.renderIntoDocument(
      <Provider store={mockStore}>
        <LeagueTable />
      </Provider>
    );


    /**
     let root = TestUtils.renderIntoDocument(
     <LeagueTable />
     );**/
    let div = TestUtils.scryRenderedDOMComponentsWithClass(root, 'tabelleClass');

    expect(div.length).toEqual(18);

  });

  xit('should have display 18 different clubs (using an explicit state)', () => {

    const DndComponent = DragDropContext(TestBackend)(UnconnectedLeagueTable);
    let root = TestUtils.renderIntoDocument(
      <DndComponent positions={SAMPLE_LEAGUE_TABLE}/>
    );


    let div = TestUtils.scryRenderedDOMComponentsWithClass(root, 'tabelleClass');
    expect(div.length).to.equal(18);

  });

  xit('should have display 18 different clubs (using an explicit state and call directly)', () => {

    //might not work due to
    //http://jaketrent.com/post/react-stateless-components-missing/
    //https://facebook.github.io/react/docs/reusable-components.html
    const divs = UnconnectedLeagueTable({positions: SAMPLE_LEAGUE_TABLE}, function () {
    });
    //console.log(JSON.stringify(divs));



    let div = TestUtils.scryRenderedDOMComponentsWithClass(divs, 'tabelleClass');
    //Upgrade to React Element, because all helper function work that way
    //Otherwise I cannot assert properly
    //let WrappedComponent = wrap(divs)
    // const root = TestUtils.renderIntoDocument(<WrappedComponent />);

    //let div = TestUtils.scryRenderedDOMComponentsWithClass(root, 'tabelleClass');
    //expect(div.length).to.equal(0);

    /**let innerChildren;
     var count = React.Children.map(divs, function (arg0) {
      React.Children.map(arg0.props.children, function (arg1) {
        React.Children.map(arg1.props.children, function (arg2) {
          React.Children.map(arg2.props.children, function (arg3) {
            console.log(arg3);
            innerChildren++
            innerChildren = arg2;
          })
        })
      })

    });**/


  });

  xit('should have display 18 different clubs (using an explicit state and a handwrappedComponent)', () => {

    //http://jaketrent.com/post/react-stateless-components-missing/
    class WrappedComponent extends React.Component {
      render() {
        return UnconnectedLeagueTable({positions: SAMPLE_LEAGUE_TABLE}, function () {
        });
      }
    }

    const DndComponent = DragDropContext(TestBackend)(WrappedComponent);

    let root = TestUtils.renderIntoDocument(<DndComponent/>);
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


