import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Actions from '../../actions';
import SearchForm from '../../components/Form/Search';

class SearchFormContainer extends React.Component {

	componentDidMount() {
		this.props.updateAvailableCountriesRequest();
	}

	changeFormHandler = (field, value) => {
		this.props.changeSearchForm(field, value);
	}

	onCountryChangeHandler = (country) => {
		this.props.setCountry(country);
	}

	onCityChangeHandler = (city)=>{
		this.props.setCity(city);
	}

	onSubmitHandler = ()=>{

	}

	render() {
		const {
			availableCountries,
			availableCities,
			country,
			city,
			form
		} = this.props;

		return (
			<div className="search-form">
				<SearchForm
					availableCountries={availableCountries}
					availableCities={availableCities}
					country={country}
					city={city}
					onChange={this.changeFormHandler}
					onCountryChange={this.onCountryChangeHandler}
					onCityChange={this.onCityChangeHandler}
					formValues={form}
					onSubmit={this.onSubmitHandler}
				/>
			</div>
		);
	}

}

SearchFormContainer.propTypes = {
	availableCountries: PropTypes.array,
	availableCities: PropTypes.array,
	country: PropTypes.string,
	city: PropTypes.string,
	updateAvailableCountriesRequest: PropTypes.func.isRequired,
	setCountry: PropTypes.func.isRequired,
	setCity: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
};

SearchFormContainer.defaultProps = {
	availableCountries: [],
};

export default connect(
	(state) => ({
		availableCountries: state.search.get('availableCountries'),
		availableCities: state.search.get('availableCities'),
		country: state.search.get('country'),
		city: state.search.get('city'),
		form: state.search.get('form'),
	}),
	(dispatch) => ({
		updateAvailableCountriesRequest: () => dispatch(Actions.search.updateAvailableCountriesRequest()),
		setCountry: (country) => dispatch(Actions.search.setCountry(country)),
		setCity: (city) => dispatch(Actions.search.setCity(city)),
		changeSearchForm: (field, value) => dispatch(Actions.search.changeSearchForm(field, value)),
	}),
)(SearchFormContainer);
