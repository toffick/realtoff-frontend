import { Map } from 'immutable';
import { CHANGE_FILTER_SHOW_STATUS } from '../actions/constants';

const initialState = Map({
	isShow: false,
});

function filterReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_FILTER_SHOW_STATUS:
			const { status } = action.payload;
			return state.set('isShow', status);
		default:
			return state;
	}
}

export default filterReducer;
