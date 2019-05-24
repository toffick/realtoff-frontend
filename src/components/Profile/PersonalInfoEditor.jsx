import React from 'react';
import {
	Button,
	ListGroup,
	Form,
} from 'react-bootstrap';
import moment from 'moment';
import validator from 'validator';
import ValidationHelper from '../../helpers/ValidationHelper';

//  encapsulate editing logic
class PersonalInfo extends React.Component {

	state = {
		newFirstName: undefined,
		newPhoneNumber: undefined,
		newPersonalLessorFlag: undefined,
		errorsMap: {},
	}

	onChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	}

	onCheckBoxChange = (e) => {
		const { checked, name } = e.target;
		this.setState({ [name]: checked });
	}

	onSaveHandler = () => {
		const { newFirstName, newPhoneNumber, newPersonalLessorFlag } = this.state;

		const {
			first_name: userName,
			telephone_number: phoneNumber,
			is_personal_lessor: isPersonalLessor,
		} = this.props.profile;

		let isSomethingWasChangedFlag = false;

		const getResultValue = (newValue, oldValue) => {
			if (newValue !== undefined && newValue !== oldValue) {
				isSomethingWasChangedFlag = true;
				return newValue;
			}
			return oldValue;
		};


		const resultName = getResultValue(newFirstName, userName);
		const resultPhone = getResultValue(newPhoneNumber, phoneNumber);
		const resultPersonalLessorFlag = getResultValue(newPersonalLessorFlag, isPersonalLessor);

		const validResult = ValidationHelper.validateChangeProfile(resultName, resultPhone);

		if (!validResult.isValid) {
			this.setState({ errorsMap: validResult.errorsMap });
		} else if (isSomethingWasChangedFlag) {
			this.props.onSave(resultName, resultPhone, resultPersonalLessorFlag);
		} else {
			this.props.onCancelEdit();
		}

	}

	render() {

		const {
			first_name: userName,
			email,
			telephone_number: phoneNumber,
			is_personal_lessor: isPersonalLessor,
			created_at: createdAt,
		} = this.props.profile;

		const { errorsMap } = this.state;

		const newFirstNameValue = this.state.newFirstName !== undefined ? this.state.newFirstName : userName;
		const newPhoneNumberValue = this.state.newPhoneNumber !== undefined ? this.state.newPhoneNumber : phoneNumber;
		const newPersonalLessorFlag = this.state.newPersonalLessorFlag !== undefined ? this.state.newPersonalLessorFlag : isPersonalLessor;

		return (
			<div className="personal-info edit-form">
				<ListGroup variant="flush">
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Имя пользователя</span>
						<div>
							<Form.Control
								className="text-right"
								name="newFirstName"
								value={newFirstNameValue}
								onChange={this.onChange}
								isInvalid={errorsMap.newFirstName}
								style={{ height: '25px' }}
							/>
							<Form.Control.Feedback type="invalid">
								{errorsMap.newFirstName}
							</Form.Control.Feedback>
						</div>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Электронная почта</span>
						<span className="text-right">{email}</span>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Мобильный телефон</span>
						<div>
							<Form.Control
								className="text-right"
								name="newPhoneNumber"
								value={newPhoneNumberValue}
								onChange={this.onChange}
								isInvalid={errorsMap.newPhoneNumber}
								style={{ height: '25px' }}
							/>
							<Form.Control.Feedback type="invalid">
								{errorsMap.newPhoneNumber}
							</Form.Control.Feedback>
						</div>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Тип арендодателя</span>
						<span className="pl-lg-1">
							<span>Частное лицо/агенство</span>
							<div style={{ textAlign: 'right' }}>
								<input
									type="checkbox"
									className="text-right"
									name="newPersonalLessorFlag"
									onChange={this.onCheckBoxChange}
									checked={newPersonalLessorFlag}
								/>
							</div>
						</span>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Дата регистрации</span>
						<span className="text-right">{moment(createdAt).locale('ru').format('L')}</span>
					</ListGroup.Item>
				</ListGroup>
				<div className="edit-buttons">
					<Button variant="secondary" onClick={this.props.onCancelEdit}>Отмена</Button>
					<Button variant="success" onClick={this.onSaveHandler}>Сохранить</Button>
				</div>
			</div>
		);
	}

}

export default PersonalInfo;
