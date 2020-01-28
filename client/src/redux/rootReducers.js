import { combineReducers } from 'redux';
import alertReducer from './alert/alertReducer';

export default combineReducers({ alertReducer: alertReducer });
