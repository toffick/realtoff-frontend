import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../../components/Form/Search';

import Actions from '../../actions';
import ValidationHelper from '../../helpers/ValidationHelper';

class SearchFormContainer extends React.Component {

	changeFormHandler = (field, value) => {
		this.props.updateForm(field, value);
	}

	onCountryChangeHandler = (country) => {
		this.props.setCountry(country);
	}

	onCityChangeHandler = (city) => {
		this.props.setCity(city);
		this.props.searchRequest();
	}

	onSubmitHandler = () => {
		const validInfo = ValidationHelper.validateOfferSearchRequest(this.props.form);
		if (validInfo.isValid) {
			this.props.setErrorObject({});
			this.props.searchRequest();
		} else {
			this.props.setErrorObject(validInfo.errorsMap);
		}
	}

	render() {
		const {
			availableCountries,
			availableCities,
			countryMeta,
			city,
			form,
			errorObject,
		} = this.props;

		return (
			<div className="search-form">
				<SearchForm
					availableCountries={availableCountries}
					availableCities={availableCities}
					countryMeta={countryMeta}
					city={city}
					onChange={this.changeFormHandler}
					onCountryChange={this.onCountryChangeHandler}
					onCityChange={this.onCityChangeHandler}
					formValues={form}
					onSubmit={this.onSubmitHandler}
					errorObject={errorObject}
				/>
			</div>
		);
	}

}

SearchFormContainer.propTypes = {
	availableCountries: PropTypes.array,
	availableCities: PropTypes.array,
	countryMeta: PropTypes.object,
	city: PropTypes.string,
	errorObject: PropTypes.object,
	form: PropTypes.object.isRequired,
	updateAvailableCountriesRequest: PropTypes.func.isRequired,
	setCountry: PropTypes.func.isRequired,
	setCity: PropTypes.func.isRequired,
	searchRequest: PropTypes.func.isRequired,
	setErrorObject: PropTypes.func.isRequired,
};

SearchFormContainer.defaultProps = {
	availableCountries: [],
};

export default connect(
	(state) => ({
		availableCountries: state.search.get('availableCountries'),
		availableCities: state.search.get('availableCities'),
		countryMeta: state.search.get('countryMeta'),
		city: state.search.get('city'),
		form: state.search.get('form'),
		errorObject: state.search.get('errorObject'),
	}),
	(dispatch) => ({
		setCountry: (country) => dispatch(Actions.search.setCountry(country)),
		setCity: (city) => dispatch(Actions.search.setCity(city)),
		updateForm: (field, value) => dispatch(Actions.search.updateForm(field, value)),
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		setErrorObject: (errorObject) => dispatch(Actions.search.setErrorObject(errorObject)),
	}),
)(SearchFormContainer);
