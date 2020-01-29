import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR } from './authTypes';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADED: {
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		}
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: true
			};
		default:
			return state;
	}
};

export default authReducer;
