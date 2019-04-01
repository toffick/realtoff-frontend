import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ROUTER_PATHS } from '../../constants/GlobalConstants';
import Actions from '../../actions';


class Profile extends React.Component {

	render() {

		const { user } = this.props;

		if (!user.telephone_number) {
			return <Redirect to={ROUTER_PATHS.REGISTER_CONTINUE} />;
		}

		return (
			<h1>Profile</h1>
		);
	}

}

Profile.propTypes = {
	user: PropTypes.object,
};

Profile.defaultProps = {
	user: null,
};

export default connect(
	(state) => ({
		user: state.auth.get('user'),
	}),
	(dispatch) => ({
		login: (email, password) => dispatch(Actions.auth.login(email, password)),
	}),
)(Profile);
