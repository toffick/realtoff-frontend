import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends React.Component {

	render() {

		return (
			<h1>Profile</h1>
		);
	}

}

Profile.propTypes = {
};

Profile.defaultProps = {
};

export default connect(
	(state) => ({
	}),
	(dispatch) => ({
	}),
)(Profile);
