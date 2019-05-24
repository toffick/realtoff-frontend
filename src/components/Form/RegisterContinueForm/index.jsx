import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import validator from 'validator';

import ErrorMessage from '../../ErrorMessage/index';
import LoadingButton from '../../Elements/LoadingButton';

class RegisterForm extends Component {

	state = {
		firstName: '',
		telephoneNumber: '',
		isPersonalLessor: true,
		formErrors: null,
	}

	_emitChange =(e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	}

	_onSubmit =(event) => {
		event.preventDefault();
		const { firstName, telephoneNumber, isPersonalLessor } = this.state;
		const isPersonalLessorNormalized = isPersonalLessor !== 'false';

		// validate in validateHelper
		if (validator.isEmpty(firstName)) {
			this.setState({ formErrors: 'Имя обязательно' });
			return;
		}

		if (firstName.length > 255) {
			this.setState({ formErrors: 'Имя не может быть больше 255 символов' });
			return;
		}

		if (validator.isEmpty(telephoneNumber)) {
			this.setState({ formErrors: 'Номер телефона обязателен' });
			return;
		}

		if (!validator.isMobilePhone(telephoneNumber)) {
			this.setState({ formErrors: 'Неверный формат номера' });
			return;
		}

		this.props.onSubmit(firstName, telephoneNumber, isPersonalLessorNormalized);
	}

	render() {
		const { error, currentlySending } = this.props;
		const {
			firstName, telephoneNumber, isPersonalLessor, formErrors,
		} = this.state;

		const mainError = formErrors || error;
		return (
			<form className="form" onSubmit={this._onSubmit}>
				{mainError ? <ErrorMessage error={mainError} /> : null}
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						type="text"
						name="firstName"
						value={firstName}
						onChange={this._emitChange}
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
					/>
					<label className="form__field-label" htmlFor="username">
						Имя пользователя
					</label>
				</div>
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						type="text"
						name="telephoneNumber"
						value={telephoneNumber}
						onChange={this._emitChange}
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
						placeholder="+___ __ _______"
					/>
					<label className="form__field-label" htmlFor="username">
						Мобильный телефон
					</label>
				</div>
				<div className="form__field-wrapper">
					<label className="form__field-label" htmlFor="isPersonalLessor">
						Аккаунт пренадлежит агенству
					</label>
					<br />
					<input
						className="form__field-input"
						type="checkbox"
						name="isPersonalLessor"
						value={!isPersonalLessor}
						onChange={this._emitChange}
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
					/>

				</div>
				<div className="form__submit-btn-wrapper">
					{currentlySending ? (
						<LoadingButton />
					) : (
						<Button className="form__submit-btn" type="submit">
							Завершить регистрацию
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
	onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
	error: null,
	currentlySending: false,
	onSubmit: () => {},
};

export default RegisterForm;
