import {
	call,
	put,
	fork,
	select,
	takeEvery,
} from 'redux-saga/effects';

import {
	offerSelector,
	searchRequestSelector,
} from '../reducers/selectors';
import {
	CREATE_OFFER,
	OFFER_PAGE_REQUEST,
	SAVE_SEARCH_FILTER_REQUEST,
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


export default function* root() {
	yield fork(createOffer);
	yield fork(offerPageRequest);
}
