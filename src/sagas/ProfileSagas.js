import {
	call,
	put,
	fork,
	takeEvery,
	take,
} from 'redux-saga/effects';

import {
	GET_PROFILE_REQUEST,
	REMOVE_USER_FILTER_REQUEST,
	EDIT_PROFILE,
} from '../actions/constants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import ToastWrapper from '../helpers/ToastHelper';
import ErrorsHelper from '../helpers/ErrorsHelper';
import { setPersonalInfo } from './AuthSagas';
import NormalizeHelper from '../helpers/NormalizeHelper';

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

export function* editProfileInfo() {

	while (true) {
		const { payload } = yield take(EDIT_PROFILE);

		const { firstName, telephoneNumber, isPersonalLessor } = payload;

		try {
			yield call(setPersonalInfo, firstName, telephoneNumber, isPersonalLessor);
			yield put(Actions.profile.getProfileRequest());
		} catch (error) {
			ToastWrapper.warn('Не удалось сохранить данныеы');
			const [errorObject] = ErrorsHelper.processServerErrors(error);
			console.error(errorObject);
		}
	}
}

export default function* root() {
	yield fork(getProfile);
	yield fork(removeUserFilters);
	yield fork(editProfileInfo);
}
