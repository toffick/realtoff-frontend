import globalReducer from './GlobalReducer';
import authReducer from './AuthReducer';
import offerReducer from './OfferReducer';
import searchReducer from './SearchReducer';
import filterReducer from './FilterReducer';

export default {
	auth: authReducer,
	global: globalReducer,
	offer: offerReducer,
	search: searchReducer,
	filter: filterReducer,
};
