import {
	call,
	put,
	fork,
	take,
	select,
} from 'redux-saga/effects';

import { offerSelector } from '../reducers/selectors';
import { CREATE_OFFER } from '../actions/constants';
import { ROUTER_PATHS } from '../constants/GlobalConstants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import ErrorsHelper from '../helpers/ErrorsHelper';

export function* createOffer() {

	while (true) {
		try {
			yield take(CREATE_OFFER);

			const offerObject = yield select(offerSelector);

			const offer = yield call([ApiService, ApiService.createOffer], offerObject);
			const { id: offerId } = offer.data;

			yield put(Actions.navigate.navigateTo(`${ROUTER_PATHS.OFFER}/${offerId}`));

		} catch (error) {
			const errors = ErrorsHelper.processServerErrors(error);
			yield put(Actions.offer.setOfferErrors(errors));
		}

	}

}


export default function* root() {
	yield fork(createOffer);
}
