import actionCreator from '../utils/ActionCreator';
import {
	GET_PROFILE_REQUEST,
	SET_PROFILE,
	REMOVE_USER_FILTER_REQUEST,
	UPDATE_USER_FILTERS
} from './constants';

export default {
	getProfileRequest: () => actionCreator(GET_PROFILE_REQUEST),
	setProfile: (profile) => actionCreator(SET_PROFILE, { profile }),
	removeUserFilerRequest: (filterId) => actionCreator(REMOVE_USER_FILTER_REQUEST, { filterId }),
	updateFilters: (filterId) => actionCreator(UPDATE_USER_FILTERS, { filterId }),
};
