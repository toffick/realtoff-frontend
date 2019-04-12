import actionCreator from '../utils/ActionCreator';
import {
	UPDATE_SEARCHING_COUNTRIES_REQUEST,
	SET_SEARCHING_COUNTRIES,
	SET_SEARCHING_COUNTRY,
	SET_SEARCHING_CITIES,
	SET_SEARCHING_CITY,
	CHANGE_SEARCH_FORM,
} from './constants';

export default {
	updateAvailableCountriesRequest: () => actionCreator(UPDATE_SEARCHING_COUNTRIES_REQUEST),
	setSearchingCountries: (countries) => actionCreator(SET_SEARCHING_COUNTRIES, { countries }),
	setCountry: (country) => actionCreator(SET_SEARCHING_COUNTRY, { country }),
	setSearchingCities: (cities) => actionCreator(SET_SEARCHING_CITIES, { cities }),
	setCity: (city) => actionCreator(SET_SEARCHING_CITY, { city }),
	changeSearchForm: (field,  value) => actionCreator(CHANGE_SEARCH_FORM, { field,  value }),

};
