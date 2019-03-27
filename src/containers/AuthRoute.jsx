import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { ROUTER_PATHS } from './../constants/GlobalConstants';

class AuthRoute extends React.Component {

	render() {

		const { children, user } = this.props;

		if (!user) {
			return <Redirect to={ROUTER_PATHS.LOGIN} />;
		}

		return children;
	}

}


AuthRoute.propTypes = {
	user: PropTypes.object,
	children: PropTypes.element.isRequired,
};

AuthRoute.defaultProps = {
	user: null,
};

export default connect(
	(state) => ({
		user: state.auth.get('user'),
	}),
	() => ({
	}),
)(AuthRoute);
