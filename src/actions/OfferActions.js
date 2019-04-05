import actionCreator from '../utils/ActionCreator';
import { CHANGE_OFFER_STEP } from './constants';

export default {
	changeOfferStep: (step) => actionCreator(CHANGE_OFFER_STEP, { step }),
};
