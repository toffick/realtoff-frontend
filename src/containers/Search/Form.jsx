import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Actions from '../../actions';
import SearchForm from '../../components/Form/Search';
import SearchMap from '../../components/Maps/Search';

class SearchingForm extends React.Component {

	componentDidMount() {
		this.props.updateAvailableCountriesRequest();
	}

	changeFormHandler = (field, value) => {
		this.props.changeSearchForm(field, value);
	}

	onCountryChangeHandler = (country) => {
		this.props.setCountry(country);
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
					formValues={form}
					onSubmit={this.onSubmitHandler}
				/>
			</div>
		);
	}

}

SearchingForm.propTypes = {
	availableCountries: PropTypes.array,
	availableCities: PropTypes.array,
	country: PropTypes.string,
	city: PropTypes.string,
	updateAvailableCountriesRequest: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
	searchAutocompleteRequest: PropTypes.func.isRequired,
};

SearchingForm.defaultProps = {
	availableCountries: [],
};

export default connect(
	(state) => ({
		availableCountries: state.search.get('availableCountries'),
		availableCities: state.search.get('availableCities'),
		country: state.search.get('availableCountries'),
		city: state.search.get('city'),
		form: state.search.get('form'),
	}),
	(dispatch) => ({
		updateAvailableCountriesRequest: () => dispatch(Actions.search.updateAvailableCountriesRequest()),
		setCountry: (country) => dispatch(Actions.search.setCountry(country)),
		changeSearchForm: (field, value) => dispatch(Actions.search.changeSearchForm(field, value)),
	}),
)(SearchingForm);
