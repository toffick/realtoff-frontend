import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import ErrorMessage from '../../ErrorMessage/index';
import LoadingButton from '../../Elements/LoadingButton';
import ValidationHelper from '../../../helpers/ValidationHelper';

class RegisterForm extends Component {

	state = {
		email: '',
		password: '',
		passwordRepeat: '',
		formErrors: null,
	}

	_emitChange =(e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	}

	_onSubmit =(event) => {
		event.preventDefault();

		const {
			email, password, passwordRepeat,
		} = this.state;

		const validResult = ValidationHelper.validateSignUp(email, password, passwordRepeat);

		if (validResult) {
			this.setState({ formErrors: validResult });
		} else {
			this.setState({ formErrors: null });
			this.props.onSubmit(email, password);
		}
	}

	render() {
		const { error, currentlySending } = this.props;
		const {
			email, password, passwordRepeat, formErrors,
		} = this.state;

		const mainError = formErrors || error;
		return (
			<form className="form" onSubmit={this._onSubmit}>
				{mainError ? <ErrorMessage error={mainError} /> : null}
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						type="text"
						name="email"
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
						name="password"
						type="password"
						value={password}
						onChange={this._emitChange}
					/>
					<label className="form__field-label" htmlFor="password">
						Пароль
					</label>
				</div>
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						name="passwordRepeat"
						type="password"
						value={passwordRepeat}
						onChange={this._emitChange}
					/>
					<label className="form__field-label" htmlFor="password">
						Повторите пароль
					</label>
				</div>
				<div className="form__submit-btn-wrapper">
					{currentlySending ? (
						<LoadingButton />
					) : (
						<Button className="form__submit-btn" type="submit">
							Зарегистрироваться
						</Button>
					)}
				</div>
			</form>
		);
	}

}

RegisterForm.propTypes = {
	error: PropTypes.any,
	currentlySending: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
	error: null,
	currentlySending: false,
};

export default RegisterForm;
