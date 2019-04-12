import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Form,
	Col,
	Row,
	Button,
} from 'react-bootstrap';

import { CURRENCY_TYPES, REALTY_TYPES } from '../../../constants/OfferConstants';
import PermitsList from '../../PermitsList';

class SearchForm extends Component {

	onChange = (e) => {
		const { value, name } = e.target;
		this.props.onChange(name, value);
	}

	onCountryChange = (e) => {
		const { value } = e.target;
		this.props.onCountryChange(value);
	}

	onCityChange = (e) => {
		const { value } = e.target;
		this.props.onCityChange(value);
	}

	onChangePermitsMask = (mask) => {
		this.props.onChange('permitsMask', mask);
	}

	onRealtyTypeChange = (e) => {
		const { value } = e.target;
		this.props.onChange('isFlat', value === REALTY_TYPES.FLAT);
	}

	onSubmit = (e) => {
		e.preventDefault();

		// TODO validation
		this.props.onSubmit();
	}

	render() {
		const {
			availableCountries,
			availableCities,
			country,
			city,
			formValues: {
				priceFrom,
				priceTo,
				currency,
				squareFrom,
				squareTo,
				roomTotal,
				permitsMask,
				isFlat,
			},
		} = this.props;

		return (
			<Form>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Country</Form.Label>
						<Form.Control
							as="select"
							name="country"
							value={country}
							onChange={this.onCountryChange}
						>
							{
								availableCountries.map((obj) =>
									(<option
										key={obj.code}
s									>{obj.country}
									</option>))
							}
						</Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>City</Form.Label>
						<Form.Control
							as="select"
							name="city"
							value={city}
							onChange={this.onCityChange}
							disabled={!availableCities.length}
						>
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
									/>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Control
										type="text"
										name="priceTo"
										value={priceTo}
										onChange={this.onChange}
									/>
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
												>{currencyObj}
												</option>))
										}
									</Form.Control>
								</Form.Group>
							</Form.Row>
						</Form.Group>

						<Form.Group as={Col}>
							<PermitsList
								nChangeMask={this.onChangePermitsMask}
								permitsMask={permitsMask}
							/>
						</Form.Group>

					</Form.Group>
					<Form.Group as={Col}>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Square total</Form.Label>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Control
											type="text"
											name="squareFrom"
											value={squareFrom}
											onChange={this.onChange}
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Control
											type="text"
											name="squareTo"
											value={squareTo}
											onChange={this.onChange}
										/>
									</Form.Group>
								</Form.Row>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Room total</Form.Label>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Control
											type="text"
											name="roomTotal"
											value={roomTotal}
											onChange={this.onChange}
										/>
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
								onChange={this.onRealtyTypeChange}
								checked={isFlat}
							/>
							<Form.Check
								label="House"
								type="radio"
								value={REALTY_TYPES.HOUSE}
								onChange={this.onRealtyTypeChange}
								checked={!isFlat}
							/>
						</Form.Group>
						<Button type="submit" onClick={this.onSubmit}>Submit</Button>

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
	country: PropTypes.string,
	city: PropTypes.string,
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
