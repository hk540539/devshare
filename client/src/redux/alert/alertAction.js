import { SET_ALERT, REMOVE_ALERT } from './alertTypes';
import uuid from 'uuid';

// export const setAlerts = () => (dispatch) => {
// 	dispatch(setAlert());
// };

export const setAlerts = (msg, alertType) => {
	return (dispatch) => {
		const id = uuid.v4();
		dispatch({
			type: SET_ALERT,
			payload: { msg, alertType, id }
		});
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
	};
};

// export const setAlert = (msg, alertType) => {
// 	const id = uuid.v4();
// 	return {
// 		type: SET_ALERT,
// 		payload: { msg, alertType, id }
// 	};
// };
