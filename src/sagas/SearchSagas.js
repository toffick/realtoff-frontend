import {
	call,
	put,
	fork,
	take,
	throttle,
	select,
	all,
} from 'redux-saga/effects';
import qs from 'qs';

import {
	SEARCH_REQUEST,
	CHANGE_SEARCH_MAP_STATE,
	SET_SEARCHING_CITIES,
	SET_SEARCHING_CITY,
	SET_SEARCHING_COUNTRIES,
	SET_SEARCHING_COUNTRY,
	START_SEARCH_WITH_QUERY,
	UPDATE_SEARCHING_COUNTRIES_REQUEST,
	UPDATE_URI_QUERY,
} from '../actions/constants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import {
	SEARCH_CITY_CENTER_TIMEOUT,
	UPDATE_SEARCH_CITIES_TIMEOUT,
	SEARCH_REQUEST_TIMEOUT,
} from '../constants/MapConstants';
import {
	searchCountrySelector,
	searchCitySelector,
	searchRequestSelector,
} from '../reducers/selectors';
import YMapApiService from '../services/YMapApiService';
import {
	CURRENCY_TYPES,
	REALTY_TYPES,
} from '../constants/OfferConstants';
import NormalizeHelper from '../helpers/NormalizeHelper';

export function* updateSearchingCountries() {

	while (yield take(UPDATE_SEARCHING_COUNTRIES_REQUEST)) {
		try {
			const countries = yield call([ApiService, ApiService.getActiveOffersCountries]);

			yield put(Actions.search.setCountries(countries.data));
			if (countries.data.length) {
				yield put(Actions.search.setCountry(countries.data[0]));
			}
		} catch (e) {
			yield put(Actions.search.setCountries([]));
		}

	}

}

export function* updateSearchCities() {

	yield throttle(UPDATE_SEARCH_CITIES_TIMEOUT, SET_SEARCHING_COUNTRY, function* () {

		try {

			const countryObj = yield select(searchCountrySelector);

			if (countryObj && countryObj.code) {
				const updatedList = yield call([ApiService, ApiService.getActiveOffersCitiesByCountry], countryObj.code);

				yield put(Actions.search.setCities(updatedList.data));
				yield put(Actions.search.setCity(null));
			}

		} catch (e) {
			yield put(Actions.search.setCities([]));
		}
	});

}

export function* findCityCenter() {

	yield throttle(SEARCH_CITY_CENTER_TIMEOUT, SET_SEARCHING_CITY, function* () {

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
			yield put(Actions.search.setCities([]));
		}
	});

}

export function* search() {

	yield throttle(SEARCH_REQUEST_TIMEOUT, SEARCH_REQUEST, function* () {

		yield put(Actions.search.searchInProgress(true));
		try {

			const queryObject = yield select(searchRequestSelector);
			const offers = yield call([ApiService, ApiService.search], queryObject);
			yield put(Actions.search.setOffers(offers.data));

			const normalizedQueryObject = NormalizeHelper.removeEmptyValuesField(queryObject);
			const queryUri = qs.stringify(normalizedQueryObject);
			yield put({ type: UPDATE_URI_QUERY, payload: { queryUri } });

		} catch (e) {
			yield put(Actions.search.setOffers([]));
		} finally {
			yield put(Actions.search.searchInProgress(false));
		}
	});

}

export function* startByUriQuery() {

	while (true) {

		const [{ payload: { countries } }, { payload: { queryObject } }] = yield all([
			take(SET_SEARCHING_COUNTRIES),
			take(START_SEARCH_WITH_QUERY),
		]);

		const {
			countryCode,
			city,
			currency,
			permitsMask,
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
			roomTotal,
			type,
		} = queryObject;

		const newFormObject = NormalizeHelper.removeUndefinedValuesField({
			currency,
			permitsMask,
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
			roomTotal,
			type,
		});

		yield put(Actions.search.setForm(newFormObject));

		const country = countries.find((item) => item.code === countryCode);

		if (!country) {
			continue;
		}

		yield take(SET_SEARCHING_COUNTRY);

		const { payload: { cities } } = yield take(SET_SEARCHING_CITIES);

		if (!cities.find((item) => item === city)) {
			continue;
		}

		yield take(CHANGE_SEARCH_MAP_STATE);
		yield put(Actions.search.setCity(city));
		yield put(Actions.search.searchRequest());
	}

}

export default function* root() {
	yield fork(updateSearchingCountries);
	yield fork(updateSearchCities);
	yield fork(findCityCenter);
	yield fork(search);
	yield fork(startByUriQuery);
}
