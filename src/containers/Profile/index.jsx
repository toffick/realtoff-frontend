import React from 'react';
import { connect } from 'react-redux';

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
				<div className="profile-page">
					<h3 style={{ padding: '20px 15px' }} className="display-4">Личный кабинет</h3>
					<hr />
					<div className="row">
						<div className="col">
							<h4 style={{padding: '15px'}}>
							Персональная информация
						</h4>
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
						</div>
						<div className="col" style={{ paddingTop: '20px' }}>
							<h4>
								Сохраненные фильтры
							</h4>
							{userFilters.length ?
								<React.Fragment>
									<FilterList filters={userFilters} onDeleteFilter={this.onDeleteUserFilterHandler} />
								</React.Fragment>
								:
								null
							}

						</div>
					</div>
					<hr />
					<div className="offers">
						<h4>
							Мои предложения
						</h4>
						<div>
							<OfferList offers={offers} />
						</div>
					</div>

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
