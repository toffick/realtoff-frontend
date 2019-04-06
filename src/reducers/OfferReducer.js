import { Map } from 'immutable';
import {
	CHANGE_OFFER_STEP,
	SET_LOCATION,
	UPDATE_AUTOCOMPLETE_LIST,
} from '../actions/constants';
import { CREATE_OFFER_STEPS } from '../constants/GlobalConstants';
import { MINSK_COORDINATES, MINSK_COORDINATES_BOUNDED_BY } from '../constants/MapConstants';

const initialState = Map({
	step: CREATE_OFFER_STEPS.LOCATION,
	autocomleteList: [],
	location: {
		coordinates: MINSK_COORDINATES,
		bounds: MINSK_COORDINATES_BOUNDED_BY
	},
});

function globalReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_OFFER_STEP: {
			const { step } = action.payload;
			return state.set('step', step);
		}
		case UPDATE_AUTOCOMPLETE_LIST: {
			const { list } = action.payload;
			return state.set('autocomleteList', list);
		}
		case SET_LOCATION: {
			const { location } = action.payload;
			return state.set('location', location);
		}
		default:
			return state;
	}
}

export default globalReducer;
