import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './authTypes';
import axios from 'axios';
import { setAlerts } from '../alert/alertAction';
import setAuthToken from '../../util/setAuthToken';

// load user is called when component mounts and unmount and provide user details to reducer state excluding password
// get access token from the local storage and set it to header using sethauthtoken function
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//Register user and store Access token in both reducer state and localstorage if register success
//and  if register is fail then remove from localstorage and reducer state

export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });
	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlerts(error.msg, 'danger')));
		}
		dispatch({ type: REGISTER_FAIL });
	}
};

//Register user and store Access token in both reducer state and localstorage if register success
//and  if register is fail then remove from localstorage and reducer state

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlerts(error.msg, 'danger')));
		}
		dispatch({ type: REGISTER_FAIL });
	}
};
