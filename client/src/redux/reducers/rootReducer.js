import auth from './authReducer';
import posts from './postReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  auth,
  posts
});
