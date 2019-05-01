import actionCreator from '../utils/ActionCreator';
import {
	ADMIN_CHANGE_OFFER_STATUS,
	ADMIN_CHANGE_USER_STATUS,
} from './constants';

export default {
	changeOfferStatus: (offerId, status) => actionCreator(ADMIN_CHANGE_OFFER_STATUS, { offerId, status }),
	changeUserStatus: (userId, status) => actionCreator(ADMIN_CHANGE_USER_STATUS, { userId, status }),
};
