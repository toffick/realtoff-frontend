import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTER_PATHS } from '../../constants/GlobalConstants';
import {
	Navbar,
	Nav,
} from 'react-bootstrap';

class Header extends Component {

	_logout = () => {
		this.props.onLogout();
	}

	render() {

		const navButtons = this.props.loggedIn ? (
			<React.Fragment>
				<Link to={ROUTER_PATHS.CREATE_OFFER} className="btn_header btn--dash btn--header">Create offer</Link>
				<Link to={ROUTER_PATHS.PROFILE} className="btn_header btn--dash btn--header">Profile</Link>
				<a href="#" className="btn_header btn--login btn--header" onClick={this._logout}>Logout</a>
			</React.Fragment>
		) : (
			<React.Fragment>
				<Link to={ROUTER_PATHS.REGISTER} className="btn_header btn--login btn--header" onClick={this.props.clearError}>Register</Link>
				<Link to={ROUTER_PATHS.LOGIN} className="btn_header btn--login btn--header" onClick={this.props.clearError}>Login</Link>
			</React.Fragment>
		);


		return (
			<Navbar collapseOnSelect expand="lg" bg="light" variant="dark" fixed="top">
				<Nav.Item href="#home" className="logo">RealtOff</Nav.Item>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">

					</Nav>
					<Nav>
						{navButtons}
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
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
