import React from 'react';
import { ListGroup } from 'react-bootstrap';
import moment from "moment";

class PersonalInfo extends React.Component {

	render() {

		const {
			first_name: userName,
			email,
			telephone_number: phoneNumber,
			is_personal_lessor: isPersonalLessor,
			created_at: createdAt,
		} = this.props.profile;

		return (
			<div className="personal-info">
				<ListGroup variant="flush">
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Имя пользователя</span>
						<span className="text-right">{userName}</span>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Электронная почта</span>
						<span className="text-right">{email}</span>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Мобильный телефон</span>
						<span className="text-right" >{phoneNumber}</span>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Тип арендодателя</span>
						<span className="text-right">{isPersonalLessor ? 'Частное лицо' : 'Агенство'}</span>
					</ListGroup.Item>
					<ListGroup.Item className="d-sm-flex justify-content-between">
						<span className="font-weight-bold">Дата регистрации</span>
						<span className="text-right">{moment(createdAt).locale('ru').format('L')}</span>
					</ListGroup.Item>
				</ListGroup>
			</div>
		);
	}

}

export default PersonalInfo;
