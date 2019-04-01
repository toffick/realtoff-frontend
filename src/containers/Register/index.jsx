import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import RegisterForm from '../../components/Form/RegisterForm';

import Actions from '../../actions';
import { ROUTER_PATHS } from '../../constants/GlobalConstants';

class Register extends Component {

	_register = (username, password, nickname) => {
		this.props.register(username, password, nickname);
	}

	render() {

		const { authRequestStatus, authError, user } = this.props;

		if (user) {
			if (!user.telephone_number) {
				return (<Redirect to={ROUTER_PATHS.REGISTER_CONTINUE} />);
			}
			return (<Redirect to={ROUTER_PATHS.INDEX} />);
		}

		return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Register</h2>
					</div>
					<RegisterForm
						onSubmit={this._register}
						btnText="Register"
						error={authError}
						currentlySending={authRequestStatus}
					/>
				</div>
			</div>
		);
	}

}

Register.propTypes = {
	user: PropTypes.object,
	authError: PropTypes.any,
	authRequestStatus: PropTypes.bool,
	register: PropTypes.func.isRequired,
};

Register.defaultProps = {
	user: null,
	authError: null,
	authRequestStatus: false,
};

export default connect(
	(state) => ({
		user: state.auth.get('user'),
		authError: state.auth.get('authError'),
	}),
	(dispatch) => ({
		register: (email, password, nickname) => dispatch(Actions.auth.register(email, password, nickname)),
	}),
)(Register);
