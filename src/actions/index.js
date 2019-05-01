import AuthActions from './AuthActions';
import GlobalActions from './GlobalActions';
import NavigateActions from './NavigateActions';
import UserActions from './UserActions';
import OfferCreateActions from './OfferCreateActions';
import OfferPageActions from './OfferPageActions';
import SearchActions from './SearchActions';
import FilterActions from './FilterActions';
import ProfileActions from './ProfileActions';
import AdminActions from './AdminActions';

export default {
	auth: AuthActions,
	profile: ProfileActions,
	global: GlobalActions,
	navigate: NavigateActions,
	user: UserActions,
	offerCreate: OfferCreateActions,
	offerPage: OfferPageActions,
	search: SearchActions,
	filter: FilterActions,
	admin: AdminActions,
};
