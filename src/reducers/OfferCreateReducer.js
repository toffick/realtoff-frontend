import { Map } from 'immutable';
import {
	CHANGE_OFFER_STEP,
	SET_OFFER_LOCATION,
	UPDATE_AUTOCOMPLETE_LIST,
	UPDATE_OFFER_DESCRIPTION,
	UPDATE_OFFER_PERSONAL,
	CLEAR_OFFER_FORM,
	SET_OFFER_ERRORS,
	SET_NETX_BUTTON_ACCESS_STATE,
} from '../actions/constants';
import {
	CREATE_OFFER_STEPS,
	CURRENCY_TYPES,
} from '../constants/OfferConstants';
import {
	MINSK_COORDINATES,
	MINSK_COORDINATES_BOUNDED_BY,
} from '../constants/MapConstants';

const defaultNextStepAccessMap = () => Object.values(CREATE_OFFER_STEPS).reduce((a, i) => {
	a[i.id] = false;
	return a;
}, {});

const initialState = Map({
	step: CREATE_OFFER_STEPS.LOCATION,
	autocomleteList: [],
	location: {
		coordinates: MINSK_COORDINATES,
		bounds: MINSK_COORDINATES_BOUNDED_BY,
	},
	description: {
		isFlat: true,
		floor: '',
		totalFloorNumber: '',
		totalRoomNumber: '',
		description: '',
		permitsMask: 0,
		squareTotal: '',
	},
	personal: {
		additionalPhoneNumber: '',
		currency: CURRENCY_TYPES.BYN,
		pricePerMonth: '',
	},
	errorObject: {},
	nextStepAccessMap: defaultNextStepAccessMap(),
});

function offerCreateReducer(state = initialState, action) {
	switch (action.type) {
		case SET_NETX_BUTTON_ACCESS_STATE: {
			const { newState, scenario } = action.payload;
			const nextStepAccessMap = state.get('nextStepAccessMap');
			return state.set('nextStepAccessMap', { ...nextStepAccessMap, [scenario]: newState });

		}
		case CHANGE_OFFER_STEP: {
			const { step } = action.payload;
			return state.set('step', step);
		}
		case UPDATE_AUTOCOMPLETE_LIST: {
			const { list } = action.payload;
			return state.set('autocomleteList', list);
		}
		case SET_OFFER_LOCATION: {
			const { location } = action.payload;
			return state.set('location', location);
		}
		case UPDATE_OFFER_DESCRIPTION: {
			const { description } = action.payload;
			const oldDescription = state.get('description');

			return state.set('description', { ...oldDescription, ...description });
		}
		case UPDATE_OFFER_PERSONAL: {
			const { personal } = action.payload;
			const oldPersonal = state.get('personal');

			return state.set('personal', { ...oldPersonal, ...personal });
		}
		case SET_OFFER_ERRORS: {
			const { errorsObject } = action.payload;
			return state.set('errorObject', errorsObject);
		}
		case CLEAR_OFFER_FORM: {
			return initialState;
		}
		default:
			return state;
	}
}

export default offerCreateReducer;
