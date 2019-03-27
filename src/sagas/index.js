import { call, spawn, all } from 'redux-saga/effects';

import initSaga from './GlobalSagas';
import authSagas from './AuthSagas';

export default function* rootSaga() {
	const sagas = [
		authSagas,
	];

	yield all(sagas.map((saga) =>
		spawn(function* () {
			while (true) {
				try {
					yield call(saga);
					break;
				} catch (e) {
					console.log(e);
				}
			}
		})));

	console.log(6);
	yield call(initSaga);
}
