import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Form,
	Col,
	Button,
	Card,
} from 'react-bootstrap';

import {
	CURRENCY_TYPES,
	REALTY_TYPES,
} from '../../../constants/OfferConstants';
import PermitsList from '../../PermitsList';
import SearchInput from '../../../containers/SearchInput';

const autoCompleteMenuStyles = {
	maxWidth: '100%',
	display: ' block',
	width: ' 100%',
	fontSize: ' 1rem',
	fontWeight: ' 400',
	color: ' #495057',
	backgroundColor: ' #fff',
	backgroundClip: ' padding-box',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
	zIndex: 5,
};

class SearchForm extends Component {

	onChange = (e) => {
		const { value, name } = e.target;
		this.props.onChange(name, value);
	}

	onCheckboxChange = (e) => {
		const { name, checked } = e.target;
		this.props.onChange(name, checked);
	}

	onChangePermitsMask = (mask) => {
		this.props.onChange('permitsMask', mask);
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit();
	}

	onClear = () => {
		this.props.onClear();
	}

	render() {
		const {
			formValues: {
				priceFrom,
				priceTo,
				currency,
				squareFrom,
				squareTo,
				roomTotal,
				permitsMask,
				type,
				isPersonalLessor,
			},
			onSaveFilter,
			errorObject,
			location,
			isShowSaveButton,
		} = this.props;

		const isSubmitDisabled = !location;

		return (
			<Card style={{ padding: '15px' }}>
				<Form>
					<Form.Row>
						<Form.Label>Введите город</Form.Label>
						<SearchInput
							onAddressQueryChange={this.props.onAddressQueryChange}
							onSetLocation={this.props.onSetLocation}
							autoCompleteMenuStyles={autoCompleteMenuStyles}
						/>
					</Form.Row>


					<Form.Row>
						<Form.Group as={Col}>

							<Form.Group>
								<Form.Label>Цена</Form.Label>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Control
											type="text"
											name="priceFrom"
											placeholder="от"
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
											placeholder="до"
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
								<Form.Label>Условия</Form.Label>
								<PermitsList
									onChangeMask={this.onChangePermitsMask}
									permitsMask={permitsMask}
								/>
							</Form.Group>

						</Form.Group>
						<Form.Group as={Col}>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Площадь(м²)</Form.Label>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Control
												type="text"
												name="squareFrom"
												placeholder="от"
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
												placeholder="до"
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
									<Form.Label>Кол-во комнат</Form.Label>
									<Form.Row>
										<Form.Group as={Col}>
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
								<Form.Label>Тип недвижимости</Form.Label>
								<Form.Check
									label="Квартира"
									type="radio"
									value={REALTY_TYPES.FLAT}
									onChange={this.onChange}
									name="type"
									checked={REALTY_TYPES.FLAT === type}
								/>
								<Form.Check
									label="Дом"
									type="radio"
									value={REALTY_TYPES.HOUSE}
									onChange={this.onChange}
									name="type"
									checked={REALTY_TYPES.HOUSE === type}
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Check
									label="Только собственник"
									type="checkbox"
									name="isPersonalLessor"
									onChange={this.onCheckboxChange}
									checked={isPersonalLessor}
								/>
							</Form.Group>

							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Button
									variant="secondary"
									onClick={this.onClear}
									disabled={isSubmitDisabled}
								>Очистить
								</Button>
								{
									isShowSaveButton ?
										(
											<Button
												onClick={onSaveFilter}
												disabled={isSubmitDisabled}
											>Сохранить
											</Button>
										)
										:
										null
								}
								<Button
									type="submit"
									onClick={this.onSubmit}
									disabled={isSubmitDisabled}
								>Найти
								</Button>
							</div>

						</Form.Group>

					</Form.Row>

				</Form>
			</Card>
		);
	}

}

SearchForm.propTypes = {
	errors: PropTypes.array,
	availableCountries: PropTypes.array,
	availableCities: PropTypes.array,
	autocomleteList: PropTypes.array,
	city: PropTypes.string,
	errorObject: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	formValues: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onAddressQueryChange: PropTypes.func.isRequired,
	onSetLocation: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
	errors: [],
	autocomleteList: [],
	search: {},
};

export default SearchForm;
