import actionCreator from '../utils/ActionCreator';
import {
	OFFER_PAGE_REQUEST,
	CHANGE_OFFER_PAGE_STATUS,
	SET_OFFER_PAGE,
	UPLOAD_OFFER_PHOTOS,
	SET_NEW_OFFER_PHOTOS,
	CLOSE_OFFER_REQUEST,
} from './constants';

export default {
	getOfferRequest: (id) => actionCreator(OFFER_PAGE_REQUEST, { id }),
	requestInProgress: (processStatus) => actionCreator(CHANGE_OFFER_PAGE_STATUS, { processStatus }),
	setOffer: (offer) => actionCreator(SET_OFFER_PAGE, { offer }),
	uploadPhotos: (photos) => actionCreator(UPLOAD_OFFER_PHOTOS, { photos }),
	setNewOfferPhotos: (photos) => actionCreator(SET_NEW_OFFER_PHOTOS, { photos }),
	closeOfferRequest: (offerId) => actionCreator(CLOSE_OFFER_REQUEST, { offerId }),
};

