import {
	call,
	put,
	fork,
	race,
	take,
} from 'redux-saga/effects';

import ApiService from '../services/ApiService';
import {
	LOGOUT_REQUEST,
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	SET_PERSONAL_INFO,
} from '../actions/constants';
import {
	LOCAL_STORAGE_PATHS,
	ROUTER_PATHS,
} from '../constants/GlobalConstants';
import Actions from '../actions';
import ErrorsHelper from '../helpers/ErrorsHelper';
import ToastWrapper from '../helpers/ToastHelper';

export function* authSaga() {

	try {
		const authResult = yield call([ApiService, ApiService.auth]);

		return authResult.data.user;
	} catch (error) {
		const [errorObject] = ErrorsHelper.processServerErrors(error);

		if (errorObject.isBanned) {
			localStorage.removeItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);
			localStorage.removeItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE);
			yield put(Actions.navigate.navigateTo(ROUTER_PATHS.INDEX));
		}

		console.error(errorObject);

		return false;
	}

}


/**
 *
 * @return {IterableIterator<*>}
 */
export function* setPersonalInfo(firstName, telephoneNumber, isPersonalLessor) {

	yield put(Actions.auth.setRequestProcessStatus(true));

	try {
		const authResult = yield call([ApiService, ApiService.setPersonalInfo], firstName, telephoneNumber, isPersonalLessor);

		return authResult.data;
	} catch (error) {
		const [errorObject] = ErrorsHelper.processServerErrors(error);
		yield put(Actions.auth.setAuthError(errorObject.message));

		return false;
	} finally {
		yield put(Actions.auth.setRequestProcessStatus(false));
	}
}

/**
 *
 * @return {IterableIterator<*>}
 */
export function* finishRegistration() {
	while (true) {
		const { payload } = yield take(SET_PERSONAL_INFO);

		const { firstName, telephoneNumber, isPersonalLessor } = payload;

		const result = yield call(setPersonalInfo, firstName, telephoneNumber, isPersonalLessor);

		if (result) {
			yield put(Actions.auth.setAuth(result));
			yield put(Actions.navigate.navigateTo(ROUTER_PATHS.INDEX));
			yield put(Actions.auth.clearError());
		}

	}
}


/**
 *
 * @return {IterableIterator<*>}
 */
export function* registerSaga(email, password) {

	yield put(Actions.auth.setRequestProcessStatus(true));

	try {
		const authResult = yield call([ApiService, ApiService.signUp], email, password);

		localStorage.setItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE, authResult.data.access_token);
		localStorage.setItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE, authResult.data.refresh_token);

		return authResult.data.user;
	} catch (error) {
		const [errorObject] = ErrorsHelper.processServerErrors(error);
		yield put(Actions.auth.setAuthError(errorObject.message));

		return false;
	} finally {
		yield put(Actions.auth.setRequestProcessStatus(false));
	}
}

/**
 *
 * @return {IterableIterator<*>}
 */
export function* registerFlow() {
	while (true) {
		const { payload } = yield take(REGISTER_REQUEST);

		const { email, password } = payload;

		const result = yield call(registerSaga, email, password);

		if (result) {
			yield put(Actions.auth.setAuth(result));
			yield put(Actions.navigate.navigateTo(ROUTER_PATHS.INDEX));
			yield put(Actions.auth.clearError());
			ToastWrapper.success('Подтвердите почту. Перейдите по ссылке, которую мы Вам отправили.', 6000);
		}

	}
}


/**
 *
 * @param email
 * @param password
 * @return {IterableIterator<*>}
 */
export function* signInSaga(email, password) {
	yield put(Actions.auth.setRequestProcessStatus(true));

	try {
		const authResult = yield call([ApiService, ApiService.signIn], email, password);

		localStorage.setItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE, authResult.data.access_token);
		localStorage.setItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE, authResult.data.refresh_token);

		return authResult.data.user;
	} catch (error) {
		const [errorObject] = ErrorsHelper.processServerErrors(error);
		yield put(Actions.auth.setAuthError(errorObject.message));

		return false;
	} finally {
		yield put(Actions.auth.setRequestProcessStatus(false));
	}
}

/**
 *
 * @return {IterableIterator<*>}
 */
export function* loginFlow() {
	while (true) {
		const { payload } = yield take(LOGIN_REQUEST);

		const { email, password } = payload;

		const winner = yield race({
			auth: call(signInSaga, email, password),
			logout: take(LOGOUT_REQUEST),
		});

		if (winner.auth) {
			yield put(Actions.auth.setAuth(winner.auth));
			yield put(Actions.navigate.navigateTo(ROUTER_PATHS.INDEX));
		}
	}
}

/**
 *
 * @return {IterableIterator<*>}
 */
export function* logoutSaga() {

	yield put(Actions.auth.setRequestProcessStatus(true));

	try {

		const accessToken = localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);
		const refreshToken = localStorage.getItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);

		yield call([ApiService, ApiService.signOut], { refreshToken, accessToken });

		return true;
	} catch (error) {
		const [errorObject] = ErrorsHelper.processServerErrors(error);
		yield put(Actions.auth.setAuthError(errorObject.message));

		return false;
	} finally {
		yield put(Actions.auth.setRequestProcessStatus(false));
	}
}

/**
 *
 * @return {IterableIterator<*>}
 */
export function* logoutFlow() {
	while (true) {
		yield take(LOGOUT_REQUEST);

		const logoutResult = yield call(logoutSaga);

		if (logoutResult) {

			localStorage.removeItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);
			localStorage.removeItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE);

			yield put(Actions.auth.setAuth(null));
			yield put(Actions.navigate.navigateTo(ROUTER_PATHS.INDEX));
		}
	}
}

export default function* root() {
	yield fork(registerFlow);
	yield fork(loginFlow);
	yield fork(logoutFlow);
	yield fork(finishRegistration);
}
