import { Map } from 'immutable';
import { CHANGE_OFFER_STEP } from '../actions/constants';
import { CREATE_OFFER_STEPS } from '../constants/GlobalConstants';
import { MINSK_COORDINATES } from '../constants/MapConstants';

const initialState = Map({
	step: CREATE_OFFER_STEPS.LOCATION,
	coordinates: MINSK_COORDINATES,
});

// Takes care of changing the application state
function globalReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_OFFER_STEP: {
			const { step } = action.payload;
			return state.set('step', step);
		}
		default:
			return state;
	}
}

export default globalReducer;
