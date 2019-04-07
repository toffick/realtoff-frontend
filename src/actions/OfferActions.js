import actionCreator from '../utils/ActionCreator';
import {
	CHANGE_OFFER_STEP,
	LOCATION_AUTOCOMPLETE_REQUEST,
	UPDATE_AUTOCOMPLETE_LIST,
	SET_OFFER_LOCATION,
	UPDATE_OFFER_DESCRIPTION,
	UPDATE_OFFER_PERSONAL,
} from './constants';

export default {
	changeOfferStep: (step) => actionCreator(CHANGE_OFFER_STEP, { step }),
	locationAutocompleteRequest: (query) => actionCreator(LOCATION_AUTOCOMPLETE_REQUEST, { query }),
	updateAutocompleteList: (list) => actionCreator(UPDATE_AUTOCOMPLETE_LIST, { list }),
	setLocation: (location) => actionCreator(SET_OFFER_LOCATION, { location }),
	updatePersonal: (description) => actionCreator(UPDATE_OFFER_DESCRIPTION, { description }),
	updatePersonal: (personal) => actionCreator(UPDATE_OFFER_PERSONAL, { personal }),
};
