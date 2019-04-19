import globalReducer from './GlobalReducer';
import authReducer from './AuthReducer';
import offerCreateReducer from './OfferCreateReducer';
import offerPageReducer from './OfferPageReducer';
import searchReducer from './SearchReducer';
import filterReducer from './FilterReducer';

export default {
	auth: authReducer,
	global: globalReducer,
	offerCreate: offerCreateReducer,
	offerPage: offerPageReducer,
	search: searchReducer,
	filter: filterReducer,
};
