import {
	call,
	put,
	fork,
	select,
	takeEvery,
} from 'redux-saga/effects';

import {
	offerSelector,
	offerIdSelector,
} from '../reducers/selectors';
import {
	CREATE_OFFER,
	OFFER_PAGE_REQUEST,
	UPLOAD_OFFER_PHOTOS,
} from '../actions/constants';
import { ROUTER_PATHS } from '../constants/GlobalConstants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import ErrorsHelper from '../helpers/ErrorsHelper';
import ToastWrapper from '../helpers/ToastHelper';

export function* createOffer() {

	yield takeEvery(CREATE_OFFER, function* () {

		try {
			const offerObject = yield select(offerSelector);

			const offer = yield call([ApiService, ApiService.createOffer], offerObject);
			const { id: offerId } = offer.data;

			yield put(Actions.navigate.navigateTo(`${ROUTER_PATHS.OFFERS}/${offerId}`));

		} catch (error) {
			const errors = ErrorsHelper.processServerErrors(error);
			yield put(Actions.offerCreate.setOfferErrors(errors));
		}

	});

}

export function* offerPageRequest() {

	yield takeEvery(OFFER_PAGE_REQUEST, function* (action) {
		yield put(Actions.offerPage.requestInProgress(true));

		const { id } = action.payload;

		try {
			const { data } = yield call([ApiService, ApiService.getOffer], id);
			if (data.success) {
				yield put(Actions.offerPage.setOffer(data.result));
			} else {
				yield put(Actions.navigate.navigateTo(ROUTER_PATHS.NOT_FOUND));
			}

		} catch (error) {
			const [errorObject] = ErrorsHelper.processServerErrors(error);
			console.error(errorObject);
		} finally {
			yield put(Actions.offerPage.requestInProgress(false));
		}

	});

}

export function* uploadPhotos() {

	yield takeEvery(UPLOAD_OFFER_PHOTOS, function* (action) {
		try {
			const { photos } = action.payload;

			const offerId = yield select(offerIdSelector);
			const { data } = yield call([ApiService, ApiService.uploadPhotos], photos, offerId);

			yield put(Actions.offerPage.setNewOfferPhotos(data));
		} catch (error) {
			ToastWrapper.warn('Не удалось загрузить фото');
			const [errorObject] = ErrorsHelper.processServerErrors(error);
			console.error(errorObject);
		}
	});

}

export default function* root() {
	yield fork(createOffer);
	yield fork(offerPageRequest);
	yield fork(uploadPhotos);
}
