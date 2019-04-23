import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Layout/Header';
import Loading from '../components/Loading';
import HeaderSearchInput from '../containers/Search/Header';

import Actions from '../actions';
import { ROUTER_PATHS } from '../constants/GlobalConstants';

class App extends React.Component {

	render() {
		const {
			children, initInProcess, user, logout, clearAuthError, routerLocation,
		} = this.props;

		if (initInProcess) {
			return <Loading />;
		}

		const loggedIn = !!user;
		const isShowHeaderSearch = routerLocation.pathname !== ROUTER_PATHS.INDEX;

		return (
			<div className="wrapper">
				<Header
					user={user}
					loggedIn={loggedIn}
					onLogout={logout}
					clearError={clearAuthError}
				>
					{isShowHeaderSearch ? <HeaderSearchInput /> : null}
				</Header>
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
	routerLocation: PropTypes.object.isRequired,
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
		routerLocation: state.router.location,
	}),
	(dispatch) => ({
		logout: () => dispatch(Actions.auth.logout()),
		clearAuthError: () => dispatch(Actions.auth.clearError()),
	}),
)(App);
