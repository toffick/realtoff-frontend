import actionCreator from '../utils/ActionCreator';
import {
	CHANGE_FILTER_SHOW_STATUS,
	SET_FILTER_ERROR,
	CHANGE_SAVE_REQUEST_STATUS,
} from './constants';

export default {
	changeShowStatus: (status) => actionCreator(CHANGE_FILTER_SHOW_STATUS, { status }),
	setError: (error) => actionCreator(SET_FILTER_ERROR, { error }),
	saveInProgress: (processStatus) => actionCreator(CHANGE_SAVE_REQUEST_STATUS, { processStatus }),
};
