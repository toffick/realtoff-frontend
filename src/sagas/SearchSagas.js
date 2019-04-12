import {
	call,
	put,
	fork,
	take,
	throttle,
	select,
} from 'redux-saga/effects';

import {
	SET_SEARCHING_CITY,
	SET_SEARCHING_COUNTRY,
	UPDATE_SEARCHING_COUNTRIES_REQUEST,
} from '../actions/constants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import { LOCATION_QUERY_THROTTLE_TIMEOUT } from '../constants/MapConstants';
import { searchCountrySelector, searchCitySelector } from '../reducers/selectors';
import YMapApiService from '../services/YMapApiService';

export function* updateSearchingCountries() {

	while (yield take(UPDATE_SEARCHING_COUNTRIES_REQUEST)) {
		try {
			const countries = yield call([ApiService, ApiService.getActiveOffersCountries]);

			yield put(Actions.search.setSearchingCountries(countries.data));
		} catch (e) {
			yield put(Actions.search.setSearchingCountries([]));
		}

	}

}

export function* updateSearchCities() {

	yield throttle(LOCATION_QUERY_THROTTLE_TIMEOUT, SET_SEARCHING_COUNTRY, function* () {

		try {

			const countryObj = yield select(searchCountrySelector);

			if (countryObj && countryObj.code) {
				const updatedList = yield call([ApiService, ApiService.getActiveOffersCitiesByCountry], countryObj.code);
				yield put(Actions.search.setSearchingCities(updatedList.data));
			}

		} catch (e) {
			yield put(Actions.search.setSearchingCities([]));
		}
	});

}

export function* findCityCenter() {

	yield throttle(LOCATION_QUERY_THROTTLE_TIMEOUT, SET_SEARCHING_CITY, function* () {

		try {
			const countryObj = yield select(searchCountrySelector);
			const city = yield select(searchCitySelector);

			if (countryObj && countryObj.code && city) {
				const updatedList = yield call([YMapApiService, YMapApiService.getCityCoordintes], countryObj.country, city);
				if (updatedList.length) {
					yield put(Actions.search.setCityLocation(updatedList[0]));
				}
			}

		} catch (e) {
			yield put(Actions.search.setSearchingCities([]));
		}
	});

}

export default function* root() {
	yield fork(updateSearchingCountries);
	yield fork(updateSearchCities);
	yield fork(findCityCenter);
}
