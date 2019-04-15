import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Form,
	Col,
	Row,
} from 'react-bootstrap';

import {
	CURRENCY_TYPES,
} from '../../../constants/OfferConstants';

class PersonalForm extends Component {

	onChange = (e) => {
		const { value, id } = e.target;
		this.props.onChange({ [id]: value });
	}

	render() {

		// TODO currency and errors
		const {
			additionalPhoneNumber,
			currency,
			pricePerMonth,
		} = this.props.personal;

		return (
			<div className="personal-form-wrapper">
				<Form>
					<Form.Group>
						<Form.Label>Дополнительный номер телефона</Form.Label>
						<Form.Control
							id="additionalPhoneNumber"
							value={additionalPhoneNumber}
							onChange={this.onChange}
						/>
						<Form.Text className="text-muted">
						(в международном формате)
						</Form.Text>
					</Form.Group>

					<Form.Group as={Row}>

						<Form.Group as={Col}>
							<Form.Label>Плата в месяц</Form.Label>
							<Form.Control
								id="pricePerMonth"
								value={pricePerMonth}
								onChange={this.onChange}
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Валюта</Form.Label>
							<Form.Control as="select" id="currency" onChange={this.onChange}>
								{
									Object.values(CURRENCY_TYPES).map((currencyItem) =>
										(
											<option selected={currency === currencyItem}>{currencyItem}</option>
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
	errors: PropTypes.array,
	personal: PropTypes.object,
	onChange: PropTypes.func.isRequired,
};

PersonalForm.defaultProps = {
	errors: [],
	description: {},
};

export default PersonalForm;
