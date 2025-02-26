import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';
import followingSlice from './reducers/followingSlice';
import likesSlice from './reducers/likeSlice';

const rootReducer = combineReducers({
  user: userSlice,
  following: followingSlice,
  like: likesSlice
});

export default rootReducer;
