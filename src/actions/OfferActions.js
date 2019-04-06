import actionCreator from '../utils/ActionCreator';
import { CHANGE_OFFER_STEP, LOCATION_AUTOCOMPLETE_REQUEST, UPDATE_AUTOCOMPLETE_LIST, SET_LOCATION } from './constants';

export default {
	changeOfferStep: (step) => actionCreator(CHANGE_OFFER_STEP, { step }),
	locationAutocompleteRequest: (query) => actionCreator(LOCATION_AUTOCOMPLETE_REQUEST, { query }),
	updateAutocompleteList: (list) => actionCreator(UPDATE_AUTOCOMPLETE_LIST, { list }),
	setLocation: (location) => actionCreator(SET_LOCATION, { location }),
};
