import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import ErrorMessage from '../../ErrorMessage/index';
import LoadingButton from '../../Elements/LoadingButton';
import ValidationHelper from "../../../helpers/ValidationHelper";

class LoginForm extends Component {

	state = {
		email: '',
		password: '',
		formErrors: null,
	}

	_emitChange =(e) => {
		const { value, id } = e.target;
		this.setState({ [id]: value });
	}

	_onSubmit = (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		const validResult = ValidationHelper.validateSignIn(email, password);

		if (validResult) {
			this.setState({ formErrors: validResult });
		} else {
			this.setState({ formErrors: null });
			this.props.onSubmit(email, password);
		}

	}

	render() {
		const { error, currentlySending } = this.props;
		const { email, password, formErrors } = this.state;

		const mainError = formErrors || error;

		return (
			<form className="form" onSubmit={this._onSubmit}>
				{mainError ? <ErrorMessage error={mainError} /> : null}
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						type="text"
						id="email"
						value={email}
						onChange={this._emitChange}
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
					/>
					<label className="form__field-label" htmlFor="username">
						Электронная почта
					</label>
				</div>
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						id="password"
						type="password"
						value={password}
						onChange={this._emitChange}
					/>
					<label className="form__field-label" htmlFor="password">
						Пароль
					</label>
				</div>
				<div className="form__submit-btn-wrapper">
					{currentlySending ? (
						<LoadingButton />
					) : (
						<Button className="form__submit-btn" type="submit">
							Войти
						</Button>
					)}
				</div>
			</form>
		);
	}


}

LoginForm.propTypes = {
	error: PropTypes.any,
	currentlySending: PropTypes.bool,
	onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
	error: null,
	currentlySending: false,
	onSubmit: () => {},
};

export default LoginForm;
