import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import userReducer from '../users/reducers';
import channelsReducer from '../channels/reducer';

const coreReducer = combineReducers({
  channels: channelsReducer,
  users: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_USER') {
    storage.removeItem('persist:root')
    state = undefined;
    // TODO: if you want selected reducers to be cleared
    // we keep a reference of the keys we want to maintain
    // other keys will be passed as undefined and this will call
    // reducers with an initial state
    // const { users, comment } = state;

    // state = { users, comment };
  }
  return coreReducer(state, action)
}

export default rootReducer;