import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Stub from '../../components/Stub';

import Actions from '../../actions';
import PersonalInfo from '../../components/Profile/PersonalInfo';
import OfferList from '../../components/Profile/OfferList';
import FilterList from '../../components/Profile/FilterList';
import PersonalInfoEditor from '../../components/Profile/PersonalInfoEditor';

class Profile extends React.Component {

	state = { editProcess: false };

	componentDidMount() {
		this.props.getProfileRequest();
	}

	onDeleteUserFilterHandler = (filterId) => {
		this.props.removeUserFilerRequest(filterId);
	}

	onChangeEditProcess = (inProcess) => {
		this.setState({ editProcess: inProcess });
	}

	onSaveEditedChanges = (firstName, telephoneNumber, isPersonalLessor) => {
		this.props.editProfile(firstName, telephoneNumber, isPersonalLessor);
		this.onChangeEditProcess(false);
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
					{
						this.state.editProcess ?
							<PersonalInfoEditor
								profile={profile}
								onCancelEdit={() => this.onChangeEditProcess(false)}
								onSave={this.onSaveEditedChanges}
							/>
							:
							<PersonalInfo profile={profile} onEditProfile={() => this.onChangeEditProcess(true)} />
					}
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
		editProfile: (firstName, telephoneNumber, isPersonalLessor) => dispatch(Actions.profile.editProfile(firstName, telephoneNumber, isPersonalLessor)),
	}),
)(Profile);
