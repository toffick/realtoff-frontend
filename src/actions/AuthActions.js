import actionCreator from '../utils/ActionCreator';
import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	AUTH_ERROR,
	SET_AUTH,
	REGISTER_REQUEST,
	AUTH_REQUEST_STATUS,
	SET_PERSONAL_INFO,
} from './constants';

export default {
	login: (email, password) => actionCreator(LOGIN_REQUEST, { email, password }),
	logout: () => actionCreator(LOGOUT_REQUEST),
	register: (email, password, nickname) => actionCreator(REGISTER_REQUEST, { email, password, nickname }),
	setPersonalInfo: (firstName, telephoneNumber, isPersonalLessor) => actionCreator(SET_PERSONAL_INFO, { firstName, telephoneNumber, isPersonalLessor }),
	setAuthError: (error) => actionCreator(AUTH_ERROR, { error }),
	setAuth: (user) => actionCreator(SET_AUTH, { user }),
	clearError: () => actionCreator(AUTH_ERROR, { error: null }),
	setRequestProcessStatus: (status) => actionCreator(AUTH_REQUEST_STATUS, { status }),
};
