import { Map } from 'immutable';

import {
	AUTH_ERROR,
	SET_AUTH,
	AUTH_REQUEST_STATUS,
} from '../actions/constants';

const initialState = Map({
	user: null,
	authError: null,
	authRequestStatus: false,
});

function authReducer(state = initialState, action) {
	switch (action.type) {
		case SET_AUTH: {
			const { user } = action.payload;
			return state.set('user', user);
		}
		case AUTH_ERROR: {
			const { error } = action.payload;
			return state.set('authError', error);
		}
		case AUTH_REQUEST_STATUS: {
			const { status } = action.payload;
			return state.set('authRequestStatus', status);
		}
		default:
			return state;
	}
}

export default authReducer;
