import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTER_PATHS } from '../../constants/GlobalConstants';

class Header extends Component {

	_logout = () => {
		this.props.onLogout();
	}

	render() {

		const navButtons = this.props.loggedIn ? (
			<div>
				<Link to={ROUTER_PATHS.PROFILE} className="btn_header btn--dash btn--header">Profile</Link>
				<a href="#" className="btn_header btn--login btn--header" onClick={this._logout}>Logout</a>
			</div>
		) : (
			<div>
				<Link to={ROUTER_PATHS.REGISTER} className="btn_header btn--login btn--header" onClick={this.props.clearError}>Register</Link>
				<Link to={ROUTER_PATHS.LOGIN} className="btn_header btn--login btn--header" onClick={this.props.clearError}>Login</Link>
			</div>
		);

		return (
			<div className="header">
				<div className="header__wrapper">
					<Link to={ROUTER_PATHS.INDEX} className="btn_header btn--dash btn--header" >Dashboard</Link>
					{navButtons}
				</div>

			</div>
		);
	}


}

Header.propTypes = {
	loggedIn: PropTypes.bool,
	onLogout: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
};

Header.defaultProps = {
	loggedIn: false,
};

export default Header;
