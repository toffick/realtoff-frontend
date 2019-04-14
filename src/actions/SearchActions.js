import actionCreator from '../utils/ActionCreator';
import {
	UPDATE_SEARCHING_COUNTRIES_REQUEST,
	SET_SEARCHING_COUNTRIES,
	SET_SEARCHING_COUNTRY,
	SET_SEARCHING_CITIES,
	SET_SEARCHING_CITY,
	UPDATE_SEARCH_FORM,
	SET_CITY_COORDINATES,
	SEARCH_REQUEST,
	SET_OFFERS,
	SET_SEARCHING_PROCESS_STATUS,
	START_SEARCH_WITH_QUERY,
	SET_SEARCH_FORM,
	CHANGE_SEARCH_MAP_STATE,
	SET_SEARCH_ERROR_OBJECT,
	CLEAR_SEARCH_PAGE,
	SET_SELECTED_OFFER_ID
} from './constants';

export default {
	updateAvailableCountriesRequest: () => actionCreator(UPDATE_SEARCHING_COUNTRIES_REQUEST),
	setCountries: (countries) => actionCreator(SET_SEARCHING_COUNTRIES, { countries }),
	setCountry: (countryMeta) => actionCreator(SET_SEARCHING_COUNTRY, { countryMeta }),
	setCities: (cities) => actionCreator(SET_SEARCHING_CITIES, { cities }),
	setCity: (city) => actionCreator(SET_SEARCHING_CITY, { city }),
	updateForm: (field, value) => actionCreator(UPDATE_SEARCH_FORM, { field, value }),
	setCityLocation: (mapMeta) => actionCreator(SET_CITY_COORDINATES, { mapMeta }),
	searchRequest: () => actionCreator(SEARCH_REQUEST),
	setOffers: (offers) => actionCreator(SET_OFFERS, { offers }),
	searchInProgress: (status) => actionCreator(SET_SEARCHING_PROCESS_STATUS, { status }),
	startWithQuery: (queryObject) => actionCreator(START_SEARCH_WITH_QUERY, { queryObject }),
	setForm: (formObject) => actionCreator(SET_SEARCH_FORM, { formObject }),
	changeMapState: (isMapReady) => actionCreator(CHANGE_SEARCH_MAP_STATE, { isMapReady }),
	setErrorObject: (errorObject) => actionCreator(SET_SEARCH_ERROR_OBJECT, { errorObject }),
	clearSearchPage: () => actionCreator(CLEAR_SEARCH_PAGE),
	setSelectedOfferId: (offerId) => actionCreator(SET_SELECTED_OFFER_ID, {offerId}),
};
