import actionCreator from '../utils/ActionCreator';
import { CHANGE_FILTER_SHOW_STATUS } from './constants';

export default {
	changeShowStatus: (status) => actionCreator(CHANGE_FILTER_SHOW_STATUS, { status }),
};
