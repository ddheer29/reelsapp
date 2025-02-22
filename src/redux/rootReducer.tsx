import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';
import followingSlice from './reducers/followingSlice';

const rootReducer = combineReducers({
  user: userSlice,
  following: followingSlice
});

export default rootReducer;
