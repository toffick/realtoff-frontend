import {
	call,
	put,
	fork,
	throttle,
} from 'redux-saga/effects';

import { LOCATION_QUERY_THROTTLE_TIMEOUT } from '../constants/MapConstants';
import YMapApiService from '../services/YMapApiService';
import {
	LOCATION_AUTOCOMPLETE_REQUEST,
} from '../actions/constants';
import Actions from '../actions';

export function* updateAddressQueryAuto() {

	yield throttle(LOCATION_QUERY_THROTTLE_TIMEOUT, LOCATION_AUTOCOMPLETE_REQUEST, function* (action) {

		let updatedList = [];
		try {
			const { query } = action.payload;

			if (query.length) {

				updatedList = yield call([YMapApiService, YMapApiService.getAutocompleteListByQuery], query);
			}

		} finally {
			yield put(Actions.offer.updateAutocompleteList(updatedList));
		}
	});

}


export default function* root() {
	yield fork(updateAddressQueryAuto);
}
