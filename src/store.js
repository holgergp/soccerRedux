import {compose, createStore } from 'redux';
import positions from './reducers/positions'
import persistState from 'redux-localstorage'
//export default createStore(positions)
const createPersistentStore = compose(
  persistState(/*paths, config*/)
)(createStore)

export default createPersistentStore(positions /*,initialState*/)
