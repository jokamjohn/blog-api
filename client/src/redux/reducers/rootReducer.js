import auth from './authReducer';
import blog from './postReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  auth,
  blog
});
