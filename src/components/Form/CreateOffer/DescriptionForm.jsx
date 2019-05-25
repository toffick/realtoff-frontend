import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Form,
	Col,
	Row,
} from 'react-bootstrap';

import PermitsForm from './PermitsForm';

import { REALTY_TYPES } from '../../../constants/OfferConstants';


class DescriptionForm extends Component {

	onRealtyTypeChecked = (evt) => {
		this.props.onChange({ isFlat: evt.target.id === REALTY_TYPES.FLAT });
	}

	onChange = (e) => {
		const { value, id } = e.target;
		this.props.onChange({ [id]: value });
	}

	onChangePermitsMask = (mask) => {
		this.props.onChange({ permitsMask: mask });
	}

	render() {

		const {
			isFlat,
			floor,
			totalFloorNumber,
			totalRoomNumber,
			description,
			permitsMask,
			squareTotal,
		} = this.props.description;

		const { errorObject } = this.props;

		return (
			<Form style={{padding: '20px 50px 0px 50px'}}>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Тип жилой недвижимости</Form.Label>
						<Form.Check
							label="Квартира"
							type="radio"
							id="flat"
							onChange={this.onRealtyTypeChecked}
							checked={isFlat}
						/>
						<Form.Check
							label="Дом"
							type="radio"
							id="house"
							onChange={this.onRealtyTypeChecked}
							checked={!isFlat}
						/>
					</Form.Group>

					<Form.Group as={Row}>
						{
							isFlat ?
								(<React.Fragment>
									<Form.Group as={Col}>
										<Form.Label>Этаж</Form.Label>
										<Form.Control
											size="sm"
											id="floor"
											onChange={this.onChange}
											value={floor}
											isInvalid={errorObject.floor}
										/>
										<Form.Control.Feedback type="invalid">
											{errorObject.floor}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Этажность</Form.Label>
										<Form.Control
											size="sm"
											id="totalFloorNumber"
											onChange={this.onChange}
											value={totalFloorNumber}
											isInvalid={errorObject.totalFloorNumber}
										/>
										<Form.Control.Feedback type="invalid">
											{errorObject.totalFloorNumber}
										</Form.Control.Feedback>
									</Form.Group>
								</React.Fragment>)
								:
								null
						}
						<Form.Group as={Col}>
							<Form.Label>Количество комнат</Form.Label>
							<Form.Control
								size="sm"
								id="totalRoomNumber"
								onChange={this.onChange}
								value={totalRoomNumber}
								isInvalid={errorObject.totalRoomNumber}
							/>
							<Form.Control.Feedback type="invalid">
								{errorObject.totalRoomNumber}
							</Form.Control.Feedback>
							<Form.Label>Общая площадь(м²)</Form.Label>
							<Form.Control
								size="sm"
								id="squareTotal"
								onChange={this.onChange}
								value={squareTotal}
								isInvalid={errorObject.squareTotal}
							/>
							<Form.Control.Feedback type="invalid">
								{errorObject.squareTotal}
							</Form.Control.Feedback>
						</Form.Group>

					</Form.Group>
				</Form.Row>

				<Form.Group>
					<PermitsForm onChangeMask={this.onChangePermitsMask} permitsMask={permitsMask} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Добавьте описание</Form.Label>
					<Form.Control
						as="textarea"
						id="description"
						rows="3"
						onChange={this.onChange}
						value={description}
						isInvalid={errorObject.description}
					/>
					<Form.Control.Feedback type="invalid">
						{errorObject.description}
					</Form.Control.Feedback>
				</Form.Group>
			</Form>
		);
	}

}

DescriptionForm.propTypes = {
	errors: PropTypes.array,
	description: PropTypes.object,
	onChange: PropTypes.func.isRequired,
};

DescriptionForm.defaultProps = {
	errors: [],
	description: {},
};

export default DescriptionForm;
