import userReducer from './UserReducer';
import globalReducer from './GlobalReducer';
import authReducer from './AuthReducer';
import offerReducer from './OfferReducer';

export default {
	user: userReducer,
	auth: authReducer,
	global: globalReducer,
	offer: offerReducer,
};
