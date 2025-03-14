import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';
import followingSlice from './reducers/followingSlice';
import likesSlice from './reducers/likeSlice';
import CommentSlice from './reducers/commentSlice';

const rootReducer = combineReducers({
  user: userSlice,
  following: followingSlice,
  like: likesSlice,
  comment: CommentSlice
});

export default rootReducer;
