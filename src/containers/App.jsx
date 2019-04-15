import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Layout/Header';
import Loading from '../components/Loading';

import Actions from '../actions';

class App extends React.Component {

	render() {
		const { children, initInProcess, user, logout, clearAuthError } = this.props;

		if (initInProcess) {
			return <Loading />;
		}

		const loggedIn = !!user;

		return (
			<div className="wrapper">
				<Header
					user={user}
					loggedIn={loggedIn}
					onLogout={logout}
					clearError={clearAuthError}
				/>
				{children}
			</div>
		);
	}

}

App.propTypes = {
	initInProcess: PropTypes.bool,
	user: PropTypes.object,
	children: PropTypes.element.isRequired,
	logout: PropTypes.func.isRequired,
	clearAuthError: PropTypes.func.isRequired,
};

App.defaultProps = {
	initInProcess: false,
	user: null,
};

export default connect(
	(state) => ({
		user: state.auth.get('user'),
		initInProcess: state.global.get('initRequestStatus'),
	}),
	(dispatch) => ({
		logout: () => dispatch(Actions.auth.logout()),
		clearAuthError: () => dispatch(Actions.auth.clearError()),
	}),
)(App);
