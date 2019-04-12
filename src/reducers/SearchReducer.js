import { Map } from 'immutable';
import {
	SET_SEARCHING_CITIES,
	SET_SEARCHING_COUNTRIES,
	SET_SEARCHING_COUNTRY,
	SET_SEARCHING_CITY,
	CHANGE_SEARCH_FORM,
	SET_CITY_COORDINATES,
} from '../actions/constants';
import { CURRENCY_TYPES } from '../constants/OfferConstants';
import {
	MINSK_COORDINATES,
	MINSK_COORDINATES_BOUNDED_BY,
} from '../constants/MapConstants';

const DEFAULT_FORM_VALUE = {
	currency: CURRENCY_TYPES.BYN,
	permitsMask: 0,
	priceFrom: undefined,
	priceTo: undefined,
	squareFrom: undefined,
	squareTo: undefined,
	roomTotal: undefined,
	isFlat: true,
};

const initialState = Map({
	availableCountries: [],
	availableCities: [],
	country: '',
	city: '',
	form: DEFAULT_FORM_VALUE,
	location: {
		coordinates: MINSK_COORDINATES,
		bounds: MINSK_COORDINATES_BOUNDED_BY,
	},
});

function globalReducer(state = initialState, action) {
	switch (action.type) {
		case SET_SEARCHING_COUNTRIES: {
			const { countries } = action.payload;
			return state.set('availableCountries', countries);
		}
		case SET_SEARCHING_COUNTRY: {
			const { country } = action.payload;
			return state.set('country', country);
		}
		case SET_SEARCHING_CITIES: {
			const { cities } = action.payload;
			return state.set('availableCities', cities);
		}
		case SET_SEARCHING_CITY: {
			const { city } = action.payload;
			return state.set('city', city);
		}
		case CHANGE_SEARCH_FORM: {
			const { field, value } = action.payload;
			const oldForm = state.get('form');
			return state.set('form', { ...oldForm, [field]: value });
		}
		case SET_CITY_COORDINATES: {
			const { location } = action.payload;
			return state.set('location', location);
		}
		default:
			return state;
	}
}

export default globalReducer;
