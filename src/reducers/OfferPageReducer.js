import { Map } from 'immutable';
import {
	CHANGE_OFFER_PAGE_STATUS,
	SET_NEW_OFFER_PHOTOS,
	SET_OFFER_PAGE,
} from '../actions/constants';

const initialState = Map({
	isRequestInProgress: false,
	errors: [],
	offer: null,
});

function globalReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_OFFER_PAGE_STATUS: {
			const { processStatus } = action.payload;
			return state.set('isRequestInProgress', processStatus);
		}
		case SET_OFFER_PAGE: {
			const { offer } = action.payload;
			return state.set('offer', offer);
		}
		case SET_NEW_OFFER_PHOTOS: {
			const { photos } = action.payload;
			const offer = {...state.get('offer')};
			offer.OfferPhotos = offer.OfferPhotos.concat(photos);
			return state.set('offer', offer);
		}
		default:
			return state;
	}
}

export default globalReducer;
