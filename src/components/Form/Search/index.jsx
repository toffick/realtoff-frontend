import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Form,
	Col,
	Button,
} from 'react-bootstrap';

import {
	CURRENCY_TYPES,
	REALTY_TYPES,
} from '../../../constants/OfferConstants';
import PermitsList from '../../PermitsList';

class SearchForm extends Component {

	onChange = (e) => {
		const { value, name } = e.target;
		this.props.onChange(name, value);
	}

	onCountryChange = (e) => {
		const { value } = e.target;
		this.props.onCountryChange(this.props.availableCountries[value]);
	}

	onCityChange = (e) => {
		const { value } = e.target;
		this.props.onCityChange(value);
	}

	onChangePermitsMask = (mask) => {
		this.props.onChange('permitsMask', mask);
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit();
	}

	render() {
		const {
			availableCountries,
			availableCities,
			city,
			formValues: {
				priceFrom,
				priceTo,
				currency,
				squareFrom,
				squareTo,
				roomTotal,
				permitsMask,
				type,
			},
			errorObject,
		} = this.props;

		const isSubmitDisabled = !city;

		return (
			<Form>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Country</Form.Label>
						<Form.Control
							as="select"
							name="country"
							onChange={this.onCountryChange}
						>
							{
								availableCountries.map((obj, index) =>
									(
										<option
											key={obj.code}
											value={index}
										>
											{obj.country}
										</option>
									))
							}
						</Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>City</Form.Label>
						<Form.Control
							as="select"
							name="city"
							value={city || ''}
							onChange={this.onCityChange}
							disabled={!availableCities.length}
						>
							<option value="" disabled>Select city...</option>
							{
								availableCities.map((cityItem) =>
									(<option key={cityItem}>{cityItem}</option>))
							}
						</Form.Control>
					</Form.Group>
				</Form.Row>


				<Form.Row>
					<Form.Group as={Col}>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Control
										type="text"
										name="priceFrom"
										value={priceFrom}
										onChange={this.onChange}
										isInvalid={errorObject.priceFrom}
									/>
									<Form.Control.Feedback type="invalid">
										{errorObject.priceFrom}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Control
										type="text"
										name="priceTo"
										value={priceTo}
										onChange={this.onChange}
										isInvalid={errorObject.priceTo}
									/>
									<Form.Control.Feedback type="invalid">
										{errorObject.priceTo}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Control
										as="select"
										name="currency"
										value={currency}
										onChange={this.onChange}
									>
										{
											Object.values(CURRENCY_TYPES).map((currencyObj) =>
												(<option
													key={currencyObj}
												>
													{currencyObj}
												</option>))
										}
									</Form.Control>
								</Form.Group>
							</Form.Row>
						</Form.Group>

						<Form.Group as={Col}>
							<PermitsList
								onChangeMask={this.onChangePermitsMask}
								permitsMask={permitsMask}
							/>
						</Form.Group>

					</Form.Group>
					<Form.Group as={Col}>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Square total(m²)</Form.Label>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Control
											type="text"
											name="squareFrom"
											value={squareFrom}
											onChange={this.onChange}
											isInvalid={errorObject.squareFrom}
										/>
										<Form.Control.Feedback type="invalid">
											{errorObject.squareFrom}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Control
											type="text"
											name="squareTo"
											value={squareTo}
											onChange={this.onChange}
											isInvalid={errorObject.squareTo}
										/>
										<Form.Control.Feedback type="invalid">
											{errorObject.squareTo}
										</Form.Control.Feedback>
									</Form.Group>
								</Form.Row>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Room total</Form.Label>
								<Form.Row>
									<Form.Group as={Col} className="form-group-padding">
										<Form.Control
											type="text"
											name="roomTotal"
											value={roomTotal}
											onChange={this.onChange}
											isInvalid={errorObject.roomTotal}
										/>
										<Form.Control.Feedback type="invalid">
											{errorObject.roomTotal}
										</Form.Control.Feedback>
									</Form.Group>
								</Form.Row>
							</Form.Group>
						</Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Choose realty type</Form.Label>
							<Form.Check
								label="Flat"
								type="radio"
								value={REALTY_TYPES.FLAT}
								onChange={this.onChange}
								name="type"
								checked={REALTY_TYPES.FLAT === type}
							/>
							<Form.Check
								label="House"
								type="radio"
								value={REALTY_TYPES.HOUSE}
								onChange={this.onChange}
								name="type"
								checked={REALTY_TYPES.HOUSE === type}
							/>
						</Form.Group>
						<Button
							type="submit"
							onClick={this.onSubmit}
							disabled={isSubmitDisabled}
						>Search
						</Button>

					</Form.Group>

				</Form.Row>

			</Form>
		);
	}

}

SearchForm.propTypes = {
	errors: PropTypes.array,
	availableCountries: PropTypes.array,
	availableCities: PropTypes.array,
	countryMeta: PropTypes.object,
	city: PropTypes.string,
	errorObject: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	formValues: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCountryChange: PropTypes.func.isRequired,
	onCityChange: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
	errors: [],
	search: {},
};

export default SearchForm;
