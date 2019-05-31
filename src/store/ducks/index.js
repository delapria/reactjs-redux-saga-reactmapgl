import { combineReducers } from 'redux';
import usersLocation from './usersLocation';
import modal from './modal';

export default combineReducers({
  usersLocation,
  modal,
});
