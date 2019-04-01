import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Actions from '../../actions';
import { ROUTER_PATHS } from '../../constants/GlobalConstants';
import RegisterContinueForm from '../../components/Form/RegisterContinueForm';

class RegisterContinue extends Component {

	_setPersonalInfo = (username, password, nickname) => {
		this.props.setPersonalInfo(username, password, nickname);
	}

	render() {

		const { authRequestStatus, authError, user } = this.props;

		if (user.telephone_number) {
			return <Redirect to={ROUTER_PATHS.INDEX} />;
		}

		return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Set personal info</h2>
						<RegisterContinueForm
							onSubmit={this._setPersonalInfo}
							btnText="Register"
							error={authError}
							currentlySending={authRequestStatus}
						/>
					</div>

				</div>
			</div>
		);
	}

}

RegisterContinue.propTypes = {
	authError: PropTypes.any,
	authRequestStatus: PropTypes.bool,
	user: PropTypes.object,
	setPersonalInfo: PropTypes.func.isRequired,
};

RegisterContinue.defaultProps = {
	authError: null,
	authRequestStatus: false,
};

export default connect(
	(state) => ({
		user: state.auth.get('user'),
		authError: state.auth.get('authError'),
		authRequestStatus: state.auth.get('authRequestStatus'),
	}),
	(dispatch) => ({
		setPersonalInfo: (firstName, telephoneNumber, isPersonalLessor) => dispatch(Actions.auth.setPersonalInfo(firstName, telephoneNumber, isPersonalLessor)),
	}),
)(RegisterContinue);
