import { Map } from 'immutable';
import {
	SET_SEARCHING_CITIES,
	SET_SEARCHING_COUNTRIES,
	SET_SEARCHING_COUNTRY,
	SET_SEARCHING_CITY,
	UPDATE_SEARCH_FORM,
	SET_CITY_COORDINATES,
	SET_SEARCHING_PROCESS_STATUS,
	SET_OFFERS,
	UPDATE_URI_QUERY,
	SET_SEARCH_FORM,
	CHANGE_SEARCH_MAP_STATE,
	SET_SEARCH_ERROR_OBJECT,
	CLEAR_SEARCH_PAGE,
	SET_SELECTED_OFFER_ID,
	UPDATE_SEARCH_AUTOCOMPLETE_LIST,
	SET_SEARCH_LOCATION,
} from '../actions/constants';
import {
	CURRENCY_TYPES,
	REALTY_TYPES,
} from '../constants/OfferConstants';
import {
	MINSK_COORDINATES,
	MINSK_COORDINATES_BOUNDED_BY,
} from '../constants/MapConstants';

const DEFAULT_FORM_VALUE = {
	currency: CURRENCY_TYPES.BYN,
	permitsMask: 0,
	priceFrom: '',
	priceTo: '',
	squareFrom: '',
	squareTo: '',
	roomTotal: '',
	type: REALTY_TYPES.FLAT,
	isPersonalLessor: false,
	nearSubway: false,
};

const initialState = Map({
	availableCountries: [],
	availableCities: [],
	countryMeta: {},
	city: '',
	form: DEFAULT_FORM_VALUE,
	mapMeta: {
		coordinates: MINSK_COORDINATES,
		bounds: MINSK_COORDINATES_BOUNDED_BY,
	},
	isSearchingInProgress: false,
	offers: [],
	queryUri: '',
	isMapReady: false,
	errorObject: {},
	selectedOfferId: null,
	autocomleteList: [],
	cityCoordinates: undefined,
});

function searchReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_SEARCH_AUTOCOMPLETE_LIST: {
			const { list } = action.payload;
			return state.set('autocomleteList', list);
		}
		case SET_SEARCH_LOCATION: {
			const { location } = action.payload;
			return state.set('location', location);
		}
		case SET_SEARCH_ERROR_OBJECT: {
			const { errorObject } = action.payload;
			return state.set('errorObject', errorObject);
		}
		case SET_SEARCHING_COUNTRIES: {
			const { countries } = action.payload;
			return state.set('availableCountries', countries);
		}
		case SET_SEARCHING_COUNTRY: {
			const { countryMeta } = action.payload;
			return state.set('countryMeta', countryMeta);
		}
		case SET_SEARCHING_CITIES: {
			const { cities } = action.payload;
			return state.set('availableCities', cities);
		}
		case SET_SEARCHING_CITY: {
			const { city } = action.payload;
			return state.set('city', city);
		}
		case UPDATE_SEARCH_FORM: {
			const { field, value } = action.payload;
			const oldForm = state.get('form');
			return state.set('form', { ...oldForm, [field]: value });
		}
		case SET_CITY_COORDINATES: {
			const { mapMeta } = action.payload;
			return state.set('mapMeta', mapMeta);
		}
		case SET_SEARCHING_PROCESS_STATUS: {
			const { status } = action.payload;
			return state.set('isSearchingInProgress', status);
		}
		case SET_OFFERS: {
			const { offers } = action.payload;
			return state.set('offers', offers);
		}
		case UPDATE_URI_QUERY: {
			const { queryUri } = action.payload;
			return state.set('queryUri', queryUri);
		}
		case SET_SEARCH_FORM: {
			const { formObject } = action.payload;
			return state.set('form', { ...DEFAULT_FORM_VALUE, ...formObject });
		}
		case CHANGE_SEARCH_MAP_STATE: {
			const { isMapReady } = action.payload;
			return state.set('isMapReady', isMapReady);
		}
		case CLEAR_SEARCH_PAGE: {
			return initialState;
		}
		case SET_SELECTED_OFFER_ID: {
			const { offerId } = action.payload;
			return state.set('selectedOfferId', offerId);
		}
		default:
			return state;
	}
}

export default searchReducer;
