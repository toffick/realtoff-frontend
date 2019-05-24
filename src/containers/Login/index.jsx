import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import LoginForm from '../../components/Form/LoginForm';

import Actions from '../../actions';
import { ROUTER_PATHS } from '../../constants/GlobalConstants';

class Login extends Component {

	_login = (email, password) => {
		this.props.login(email, password);
	}

	render() {
		const { authRequestStatus, authError, user } = this.props;

		if (user) {
			return <Redirect to={ROUTER_PATHS.INDEX} />;
		}

		return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Вход</h2>
					</div>
					<LoginForm
						onSubmit={this._login}
						btnText="Login"
						error={authError}
						currentlySending={authRequestStatus}
					/>
				</div>
			</div>
		);
	}


}

Login.propTypes = {
	authError: PropTypes.any,
	authRequestStatus: PropTypes.bool,
	user: PropTypes.object.isRequired,
	login: PropTypes.isRequired,
};

Login.defaultProps = {
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
		login: (email, password) => dispatch(Actions.auth.login(email, password)),
	}),
)(Login);
