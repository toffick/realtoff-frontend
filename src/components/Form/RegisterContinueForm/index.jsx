import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import ErrorMessage from '../../ErrorMessage/index';
import LoadingButton from '../../Elements/LoadingButton';

class RegisterForm extends Component {

	state = {
		firstName: 'Неколян',
		telephoneNumber: '+375336698055',
		isPersonalLessor: false,
		formErrors: null,
	}

	_emitChange =(e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	}

	_onSubmit =(event) => {
		event.preventDefault();
		// TODO validation
		// TODO add to errors
		const { firstName, telephoneNumber, isPersonalLessor } = this.state;
		this.props.onSubmit(firstName, telephoneNumber, isPersonalLessor);
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
					/>
					<label className="form__field-label" htmlFor="username">
						Мобильный телефон
					</label>
				</div>
				{
					/* TODO чекбокс */
				}
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						type="checkbox"
						name="isPersonalLessor"
						value={isPersonalLessor}
						onChange={this._emitChange}
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
					/>
					<label className="form__field-label" htmlFor="username">
						Частное лицо
					</label>
				</div>
				<div className="form__submit-btn-wrapper">
					{currentlySending ? (
						<LoadingButton />
					) : (
						<Button className="form__submit-btn" type="submit">
							Сохранить личные данные
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
