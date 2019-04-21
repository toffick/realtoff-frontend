import { Map } from 'immutable';
import {
	SET_PROFILE,
	UPDATE_USER_FILTERS,
} from '../actions/constants';

const initialState = Map({
	profile: null,
});

function profileReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE: {
			const { profile } = action.payload;
			return state.set('profile', profile);
		}
		case UPDATE_USER_FILTERS: {
			const { filterId } = action.payload;
			const profile = {...state.get('profile')};
			profile.UserFilters = profile.UserFilters.filter(({ id }) => id !== filterId);
			return state.set('profile', profile);
		}
		default:
			return state;
	}
}

export default profileReducer;
