import { call, put } from 'redux-saga/effects';
import Actions from '../actions';
import { authSaga } from './AuthSagas';

export default function* globalRootSaga() {

	yield put(Actions.global.setRequestProcessStatus(true));

	const authResult = yield call(authSaga);

	if (authResult) {
		yield put(Actions.auth.setAuth(authResult));
	}

	yield put(Actions.global.setRequestProcessStatus(false));

}
