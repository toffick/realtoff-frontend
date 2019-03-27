import { call, put, fork, race, take } from 'redux-saga/effects';

import ApiService from '../services/ApiService';
import {
	LOGOUT_REQUEST,
	LOGIN_REQUEST,
} from '../actions/constants';
import { LOCAL_STORAGE_PATHS, ROUTER_PATHS } from '../constants/GlobalConstants';
import Actions from '../actions';
import ErrorsHelper from '../helpers/ErrorsHelper';

export function* authSaga() {

	try {
		const authResult = yield call([ApiService, ApiService.auth]);

		return authResult.data;
	} catch (error) {
		const [errorObject] = ErrorsHelper.processServerErrors(error);
		console.error(errorObject);

		return false;
	}

}
/**
 *
 * @param email
 * @param password
 * @return {IterableIterator<*>}
 */
export function* signIn(email, password) {
	yield put(Actions.auth.setRequestProcessStatus(true));

	try {
		const authResult = yield call([ApiService, ApiService.signIn], email, password);

		localStorage.setItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE, authResult.data.access_token);
		localStorage.setItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE, authResult.data.refresh_token);

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
export function* loginFlow() {
	while (true) {
		const { payload } = yield take(LOGIN_REQUEST);

		const { email, password } = payload;

		const winner = yield race({
			auth: call(signIn, email, password),
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
export function* logout() {

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

		const logoutResult = yield call(logout);

		if (logoutResult) {

			localStorage.removeItem(LOCAL_STORAGE_PATHS.ACCESS_TOKEN_LOCAL_STORAGE);
			localStorage.removeItem(LOCAL_STORAGE_PATHS.REFRESH_TOKEN_LOCAL_STORAGE);

			yield put(Actions.auth.setAuth(null));
			yield put(Actions.navigate.navigateTo(ROUTER_PATHS.INDEX));
		}
	}
}

export default function* root() {
	yield fork(loginFlow);
	yield fork(logoutFlow);
}
