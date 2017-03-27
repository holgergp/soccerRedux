import { createStore } from 'redux';
import positions from '../reducers/positions'

const createPersistentStore = function(){
  return createStore(positions)


};

export default createPersistentStore( /*,initialState*/)
