import { Map } from 'immutable';
import {
	CHANGE_FILTER_SHOW_STATUS,
	SET_FILTER_ERROR,
	CHANGE_SAVE_REQUEST_STATUS
} from '../actions/constants';

const initialState = Map({
	isShow: false,
	error: false,
	processStatus: false
});

function filterReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_FILTER_SHOW_STATUS:
			const { status } = action.payload;
			return state.set('isShow', status);
		case SET_FILTER_ERROR:
			const { error } = action.payload;
			return state.set('error', error);
		case CHANGE_SAVE_REQUEST_STATUS:
			const { processStatus } = action.payload;
			return state.set('processStatus', processStatus);
		default:
			return state;
	}
}

export default filterReducer;
