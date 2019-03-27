import actionCreator from '../utils/ActionCreator';
import { INIT_IN_PROCESS_STATUS } from './constants';

export default {
	setRequestProcessStatus: (status) => actionCreator(INIT_IN_PROCESS_STATUS, {status}),
};
