import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Form,
	Col,
	Row,
} from 'react-bootstrap';

import PermitsForm from './PermitsForm';

import {
	CURRENCY_TYPES,
	REALTY_TYPES,
} from '../../../constants/OfferConstants';


class PersonalForm extends Component {

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
			additionalPhoneNumber,
			currency,
			pricePerMonth,
		} = this.props.personal;

		return (
			<div className="personal-form-wrapper">
				<Form>
					<Form.Group>
						<Form.Label>Enter additional phone number</Form.Label>
						<Form.Control
							id="additionalPhoneNumber"
							value={additionalPhoneNumber}
							onChange={this.onChange}
						/>
						<Form.Text className="text-muted">
						(in international format)
						</Form.Text>
					</Form.Group>

					<Form.Group as={Row}>

						<Form.Group as={Col}>
							<Form.Label>Price per month</Form.Label>
							<Form.Control
								id="pricePerMonth"
								value={pricePerMonth}
								onChange={this.onChange}
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Currency</Form.Label>
							<Form.Control as="select" id="currency" onChange={this.onChange}>
								{
									Object.values(CURRENCY_TYPES).map((currency) =>
										(
											<option>{currency}</option>
										))
								}
							</Form.Control>
						</Form.Group>

					</Form.Group>


				</Form>
			</div>
		);
	}

}

PersonalForm.propTypes = {
	personal: PropTypes.object,
	onChange: PropTypes.func.isRequired,
};

PersonalForm.defaultProps = {
	description: {},
};

export default PersonalForm;
