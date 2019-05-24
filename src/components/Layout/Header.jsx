import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Navbar,
	Nav,
} from 'react-bootstrap';

import { ROUTER_PATHS } from '../../constants/GlobalConstants';

class Header extends Component {

	_logout = () => {
		this.props.onLogout();
	}

	render() {

		const { loggedIn, user, children } = this.props;

		const navButtons = loggedIn ? (
			user.is_email_confirmed ?
				(
					<React.Fragment>
						<Link to={ROUTER_PATHS.CREATE_OFFER} className="btn_header btn--dash btn--header" disabled>Создать предложение</Link>
						<Link to={ROUTER_PATHS.PROFILE} className="btn_header btn--dash btn--header">Профиль</Link>
						<a href="#" className="btn_header btn--login btn--header" onClick={this._logout}>Выйти</a>
					</React.Fragment>
				) :
				(
					<React.Fragment>
						<Nav.Item className="btn_header btn--dash btn--header confirm-email-notification">Подтвердите вашу почту!</Nav.Item>
						<a href="#" className="btn_header btn--login btn--header" onClick={this._logout}>Выйти</a>
					</React.Fragment>
				)
		)
			:
			(
				<React.Fragment>
					<Link to={ROUTER_PATHS.REGISTER} className="btn_header btn--login btn--header" onClick={this.props.clearError}>Зарегистрироваться</Link>
					<Link to={ROUTER_PATHS.LOGIN} className="btn_header btn--login btn--header" onClick={this.props.clearError}>Войти</Link>
				</React.Fragment>
			);


		return (
			<Navbar collapseOnSelect expand="lg" bg="light" variant="dark" fixed="top">
				<Nav.Item href="/" className="logo">
					{/* TODO class */}
					<a href={ROUTER_PATHS.INDEX}>
						RealtOff
					</a>
				</Nav.Item>

				<Nav.Item style={{ paddingLeft: '25px' }}>
					{children}
				</Nav.Item>

				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto" />
					<Nav>
						{navButtons}
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
	}


}

Header.propTypes = {
	loggedIn: PropTypes.bool,
	user: PropTypes.object,
	onLogout: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
};

Header.defaultProps = {
	loggedIn: false,
	user: {},
};

export default Header;
