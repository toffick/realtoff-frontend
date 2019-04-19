import { Map } from 'immutable';
import {
	CHANGE_OFFER_PAGE_STATUS,
	SET_OFFER_PAGE,
} from '../actions/constants';

const initialState = Map({
	isRequestInProgress: false,
	errors: [],
	offer: null,
});

function globalReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_OFFER_PAGE_STATUS: {
			const { processStatus } = action.payload;
			return state.set('isRequestInProgress', processStatus);
		}
		case SET_OFFER_PAGE: {
			const { offer } = action.payload;
			return state.set('offer', offer);
		}
		default:
			return state;
	}
}

export default globalReducer;
