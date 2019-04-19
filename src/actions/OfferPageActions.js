import actionCreator from '../utils/ActionCreator';
import {
	OFFER_PAGE_REQUEST,
	CHANGE_OFFER_PAGE_STATUS,
	SET_OFFER_PAGE,
} from './constants';

export default {
	getOfferRequest: (id) => actionCreator(OFFER_PAGE_REQUEST, { id }),
	requestInProgress: (processStatus) => actionCreator(CHANGE_OFFER_PAGE_STATUS, { processStatus }),
	setOffer: (offer) => actionCreator(SET_OFFER_PAGE, { offer }),
};
