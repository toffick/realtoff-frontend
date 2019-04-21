import { call, spawn, all } from 'redux-saga/effects';

import initSaga from './GlobalSagas';
import authSagas from './AuthSagas';
import geoSagas from './GeoSagas';
import offerSagas from './OfferSagas';
import searchSagas from './SearchSagas';
import profileSagas from './ProfileSagas';

export default function* rootSaga() {
	const sagas = [
		authSagas,
		geoSagas,
		offerSagas,
		searchSagas,
		profileSagas,
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

	yield call(initSaga);
}
