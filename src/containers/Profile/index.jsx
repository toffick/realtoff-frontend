import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Stub from '../../components/Stub';

import Actions from '../../actions';
import PersonalInfo from '../../components/Profile/PersonalInfo';
import OfferList from '../../components/Profile/OfferList';
import FilterList from '../../components/Profile/FilterList';

class Profile extends React.Component {

	componentDidMount() {
		this.props.getProfileRequest();
	}

	onDeleteUserFilterHandler = (filterId) => {
		this.props.removeUserFilerRequest(filterId);
	}

	render() {
		const { profile } = this.props;

		if (!profile) {
			return (<Stub />);
		}

		const { UserFilters: userFilters, Offers: offers } = profile;

		return (
			<div className="profile-page-wrapper">
				<div className="d-sm-flex justify-content-between">
					<PersonalInfo profile={profile} />
					<OfferList offers={offers} />
				</div>
				<div style={{ paddingTop: '20px' }}>
					{userFilters.length ?
						<React.Fragment>
							Сохраненные фильтры, по которым Вы получаете уведомления
							<FilterList filters={userFilters} onDeleteFilter={this.onDeleteUserFilterHandler} />
						</React.Fragment>
						:
						null
					}

				</div>
			</div>
		);
	}

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default connect(
	(state) => ({
		profile: state.profile.get('profile'),
	}),
	(dispatch) => ({
		getProfileRequest: () => dispatch(Actions.profile.getProfileRequest()),
		removeUserFilerRequest: (filterId) => dispatch(Actions.profile.removeUserFilerRequest(filterId)),
	}),
)(Profile);
