import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../../components/Form/Search';

import Actions from '../../actions';
import ValidationHelper from '../../helpers/ValidationHelper';
import FilterModal from '../FilterModal';

class SearchFormContainer extends React.Component {

	changeAddressHandler = (query) => {
		this.props.locationAutocompleteRequest(query);
	}

	changeLocationHandler = (location) => {
		if (location.address.city) {
			this.props.setLocation(location);
			this.props.searchRequest();
		}
	}

	changeFormHandler = (field, value) => {
		this.props.updateForm(field, value);
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

	onSaveFilterHandler =() => {
		const validInfo = ValidationHelper.validateOfferSearchRequest(this.props.form);
		if (validInfo.isValid) {
			this.props.setErrorObject({});
			this.props.changeFilterShowStatus(true);
		} else {
			this.props.setErrorObject(validInfo.errorsMap);
		}
	}

	render() {
		const {
			city,
			form,
			errorObject,
			isShowFilterModal,
			autocomleteList,
			location,
		} = this.props;

		return (
			<div className="search-form">
				<FilterModal isShow={isShowFilterModal && location} />
				<SearchForm
					city={city}
					onChange={this.changeFormHandler}
					formValues={form}
					onSubmit={this.onSubmitHandler}
					errorObject={errorObject}
					onSaveFilter={this.onSaveFilterHandler}
					onAddressChange={this.changeAddressHandler}
					autocomleteList={autocomleteList}
					location={location}
					onSetLocation={this.changeLocationHandler}
				/>
			</div>
		);
	}

}

SearchFormContainer.propTypes = {
	isShowFilterModal: PropTypes.bool,
	location: PropTypes.object,
	errorObject: PropTypes.object,
	form: PropTypes.object.isRequired,
	updateAvailableCountriesRequest: PropTypes.func.isRequired,
	searchRequest: PropTypes.func.isRequired,
	setErrorObject: PropTypes.func.isRequired,
	changeFilterShowStatus: PropTypes.func.isRequired,
};

SearchFormContainer.defaultProps = {
	availableCountries: [],
	location: undefined,
};

export default connect(
	(state) => ({
		location: state.search.get('location'),
		autocomleteList: state.search.get('autocomleteList'),
		form: state.search.get('form'),
		errorObject: state.search.get('errorObject'),
		isShowFilterModal: state.filter.get('isShow'),
	}),
	(dispatch) => ({
		changeFilterShowStatus: (status) => dispatch(Actions.filter.changeShowStatus(status)),
		updateForm: (field, value) => dispatch(Actions.search.updateForm(field, value)),
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		setErrorObject: (errorObject) => dispatch(Actions.search.setErrorObject(errorObject)),
		locationAutocompleteRequest: (query) => dispatch(Actions.search.locationAutocompleteRequest(query)),
		setLocation: (location) => dispatch(Actions.search.setLocation(location)),
	}),
)(SearchFormContainer);
