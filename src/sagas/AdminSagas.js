/* eslint-disable no-undef */
import {
	call,
	put,
	fork,
	takeEvery,
	select,
} from 'redux-saga/effects';

import { ADMIN_CHANGE_OFFER_STATUS, ADMIN_CHANGE_USER_STATUS } from '../actions/constants';
import Actions from '../actions';
import ApiService from '../services/ApiService';
import ErrorsHelper from '../helpers/ErrorsHelper';
import ToastWrapper from '../helpers/ToastHelper';
import { offerIdSelector } from '../reducers/selectors';

export function* changeOfferStatus() {

	yield takeEvery(ADMIN_CHANGE_OFFER_STATUS, function* (action) {

		try {

			const { offerId, status } = action.payload;

			const result = yield call([ApiService, ApiService.changeOfferStatus], offerId, status);

			const success = result.data;
			if (success) {
				yield put(Actions.offerPage.getOfferRequest(offerId));
				ToastWrapper.success(`Статус предложения ${offerId} изменен на ${status}`);
			} else {
				ToastWrapper.warn(`Ошибка измения статуса. Обратитесь ${__CONTACT_EMAIL__}`);
			}

		} catch (error) {
			const errors = ErrorsHelper.processServerErrors(error);
			yield put(Actions.offerCreate.setOfferErrors(errors));
		}

	});

}

export function* changeUserStatus() {

	yield takeEvery(ADMIN_CHANGE_USER_STATUS, function* (action) {

		try {

			const { userId, status } = action.payload;

			const result = yield call([ApiService, ApiService.changeUserStatus], userId, status);
			const success = result.data;
			if (success) {
				const offerId = yield select(offerIdSelector);
				yield put(Actions.offerPage.getOfferRequest(offerId));
				ToastWrapper.success(`Статус пользователя ${userId} изменен на ${status}`);
			} else {
				ToastWrapper.warn(`Ошибка измения статуса пользователя. Обратитесь ${__CONTACT_EMAIL__}`);
			}

		} catch (error) {
			const errors = ErrorsHelper.processServerErrors(error);
			yield put(Actions.offerCreate.setOfferErrors(errors));
			console.log(error);
		}

	});

}


export default function* root() {
	yield fork(changeOfferStatus);
	yield fork(changeUserStatus);
}
