import { Map } from 'immutable';
import { INIT_IN_PROCESS_STATUS } from '../actions/constants';

const initialState = Map({
	initRequestStatus: true,
});

// Takes care of changing the application state
function globalReducer(state = initialState, action) {
	switch (action.type) {
		case INIT_IN_PROCESS_STATUS: {
			const { status } = action.payload;
			return state.set('initRequestStatus', status);
		}
		default:
			return state;
	}
}

export default globalReducer;
