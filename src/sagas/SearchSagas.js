import {
	call,
	put,
	fork,
	take,
	throttle,
	select,
	takeEvery,
} from 'redux-saga/effects';
import qs from 'qs';
import iso3166 from 'iso-3166-1-alpha-2';

import {
	SEARCH_REQUEST,
	CHANGE_SEARCH_MAP_STATE,
	START_SEARCH_WITH_QUERY,
	UPDATE_URI_QUERY,
	SAVE_SEARCH_FILTER_REQUEST,
} from '../actions/constants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import { SEARCH_REQUEST_TIMEOUT } from '../constants/MapConstants';
import { searchRequestSelector } from '../reducers/selectors';
import YMapApiService from '../services/MapApiService';
import NormalizeHelper from '../helpers/NormalizeHelper';
import ToastWrapper from '../helpers/ToastHelper';
import ErrorsHelper from '../helpers/ErrorsHelper';

export function* saveUserFilter() {

	yield takeEvery(SAVE_SEARCH_FILTER_REQUEST, function* () {

		yield put(Actions.filter.saveInProgress(true));

		try {

			const queryObject = yield select(searchRequestSelector);
			yield call([ApiService, ApiService.saveUserFilters], queryObject);

			yield put(Actions.filter.changeShowStatus(false));
			ToastWrapper.success('Пользовательский фильтр сохранен', 6000);
			yield put(Actions.filter.setError(null));

		} catch (error) {
			const [errorObject] = ErrorsHelper.processServerErrors(error);
			yield put(Actions.filter.setError(errorObject.message));
		} finally {
			yield put(Actions.filter.saveInProgress(false));
		}

	});

}

export function* search() {

	yield throttle(SEARCH_REQUEST_TIMEOUT, SEARCH_REQUEST, function* () {

		yield put(Actions.search.searchInProgress(true));
		try {

			const queryObject = yield select(searchRequestSelector);

			if (!queryObject.city) {
				return;
			}

			const offers = yield call([ApiService, ApiService.search], queryObject);
			yield put(Actions.search.setOffers(offers.data));

			const normalizedQueryObject = NormalizeHelper.removeEmptyValuesFields(queryObject);
			const queryUri = qs.stringify(normalizedQueryObject);
			yield put({ type: UPDATE_URI_QUERY, payload: { queryUri } });

			yield put(Actions.search.setSelectedOfferId(null));

		} catch (e) {
			yield put(Actions.search.setOffers([]));
		} finally {
			yield put(Actions.search.searchInProgress(false));
		}
	});

}

export function* startByUriQuery() {

	const { payload: { queryObject } } = yield take(START_SEARCH_WITH_QUERY);

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

	const newFormObject = NormalizeHelper.removeUndefinedValuesFields({
		currency,
		permitsMask,
		priceFrom,
		priceTo,
		squareFrom,
		squareTo,
		roomTotal,
		type,
	});

	const country = iso3166.getCountry(countryCode);
	if (!country) {
		return;
	}

	const location = yield call([YMapApiService, YMapApiService.getCityCoordintes], country, city);
	if (!location) {
		return;
	}

	yield take(CHANGE_SEARCH_MAP_STATE);
	yield put(Actions.search.setForm(newFormObject));
	yield put(Actions.search.setLocation(location));
	yield put(Actions.search.searchRequest());

}

export default function* root() {
	yield fork(search);
	yield fork(saveUserFilter);
	yield fork(startByUriQuery);
}
