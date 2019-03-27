import userReducer from './UserReducer';
import globalReducer from './GlobalReducer';
import authReducer from './AuthReducer';

export default {
	user: userReducer,
	auth: authReducer,
	global: globalReducer,
};
