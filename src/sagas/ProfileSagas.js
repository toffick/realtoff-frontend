import {
	call,
	put,
	fork,
	takeEvery,
} from 'redux-saga/effects';

import { LOCATION_QUERY_THROTTLE_TIMEOUT } from '../constants/MapConstants';
import YMapApiService from '../services/MapApiService';
import {
	LOCATION_AUTOCOMPLETE_REQUEST,
	LOCATION_SEARCH_AUTOCOMPLETE_REQUEST,
	UPLOAD_OFFER_PHOTOS,
	GET_PROFILE_REQUEST,
	REMOVE_USER_FILTER_REQUEST,
} from '../actions/constants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import ToastWrapper from '../helpers/ToastHelper';
import ErrorsHelper from '../helpers/ErrorsHelper';

export function* getProfile() {

	yield takeEvery(GET_PROFILE_REQUEST, function* () {
		try {

			const { data } = yield call([ApiService, ApiService.getProfile]);

			yield put(Actions.profile.setProfile(data));
		} catch (error) {
			ToastWrapper.warn('Не удалось получить данные профиля');
			const [errorObject] = ErrorsHelper.processServerErrors(error);
			console.error(errorObject);
		}
	});

}

export function* removeUserFilters() {

	yield takeEvery(REMOVE_USER_FILTER_REQUEST, function* (action) {
		try {

			const { filterId } = action.payload;

			yield call([ApiService, ApiService.removeUserFilter], filterId);

			yield put(Actions.profile.updateFilters(filterId));
		} catch (error) {
			ToastWrapper.warn('Не удалось удалить пользовательский фильтр');
			const [errorObject] = ErrorsHelper.processServerErrors(error);
			console.error(errorObject);
		}
	});

}

export default function* root() {
	yield fork(getProfile);
	yield fork(removeUserFilters);
}
