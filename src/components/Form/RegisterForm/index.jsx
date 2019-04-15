import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import ErrorMessage from '../../ErrorMessage/index';
import LoadingButton from '../../Elements/LoadingButton';

class RegisterForm extends Component {

	state = {
		email: 'www@mail.com',
		password: '123456',
		passwordRepeat: '123456',
		nickname: 'toffick',
		formErrors: null,
	}

	_emitChange =(e) => {
		const { value, id } = e.target;
		this.setState({ [id]: value });
	}

	_onSubmit =(event) => {
		event.preventDefault();
		// TODO validation
		// TODO add to errors
		const {
			email, password, passwordRepeat, nickname,
		} = this.state;
		this.props.onSubmit(email, password, nickname);
	}

	render() {
		const { error, currentlySending } = this.props;
		const {
			email, password, passwordRepeat, nickname, formErrors,
		} = this.state;

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
						placeholder="Email"
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
						id="password"
						type="password"
						value={password}
						placeholder="••••••••••"
						onChange={this._emitChange}
					/>
					<label className="form__field-label" htmlFor="password">
						Пароль
					</label>
				</div>
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						id="password-repeat"
						type="password"
						value={passwordRepeat}
						placeholder="••••••••••"
						onChange={this._emitChange}
					/>
					<label className="form__field-label" htmlFor="password">
						Повторите пароль
					</label>
				</div>
				<div className="form__field-wrapper">
					<input
						className="form__field-input"
						type="text"
						id="nickname"
						value={nickname}
						placeholder="Nickname"
						onChange={this._emitChange}
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
					/>
					<label className="form__field-label" htmlFor="password">
						Логин
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
