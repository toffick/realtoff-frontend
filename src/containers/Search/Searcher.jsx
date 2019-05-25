import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../../components/Form/Search';

import Actions from '../../actions';
import ValidationHelper from '../../helpers/ValidationHelper';
import FilterModal from '../FilterModal';

class SearchFormContainer extends React.Component {

	changeAddressQueryHandler = (query) => {
		this.props.locationAutocompleteRequest(query);
	}

	changeLocationHandler = (newLocation) => {
		const { location } = this.props;

		if (newLocation.address.city && newLocation !== location) {
			this.props.setLocation(newLocation);
			this.props.searchRequest();
		}
	}

	changeFormHandler = (field, value) => {
		this.props.updateForm(field, value);
	}

	onClearHandler = () => {
		this.props.setLocation(null);
		this.props.clearSearch();
	}

	onSubmitHandler = () => {
		// TODO сравнивать хэш текущего объекта и предыдущего для отправки. мб это нужно сделать будет в саге
		const validInfo = ValidationHelper.validateOfferSearchRequest(this.props.form);
		if (validInfo.isValid) {
			this.props.setErrorObject({});
			this.props.searchRequest();
		} else {
			this.props.setErrorObject(validInfo.errorsMap);
		}
	}

	onSaveFilterHandler = () => {
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
			form,
			errorObject,
			isShowFilterModal,
			location,
			user,
		} = this.props;

		const isShowSaveButton = user && user.is_email_confirmed;

		return (
			<div className="search-form">
				<FilterModal isShow={isShowFilterModal && location} />
				<SearchForm
					onChange={this.changeFormHandler}
					formValues={form}
					onSubmit={this.onSubmitHandler}
					errorObject={errorObject}
					onSaveFilter={this.onSaveFilterHandler}
					location={location}
					onAddressQueryChange={this.changeAddressQueryHandler}
					onSetLocation={this.changeLocationHandler}
					isShowSaveButton={isShowSaveButton}
					onClear={this.onClearHandler}
				/>
			</div>
		);
	}

}

SearchFormContainer.propTypes = {
	isShowFilterModal: PropTypes.bool,
	location: PropTypes.object,
	user: PropTypes.object,
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
		form: state.search.get('form'),
		errorObject: state.search.get('errorObject'),
		isShowFilterModal: state.filter.get('isShow'),
		user: state.auth.get('user'),
	}),
	(dispatch) => ({
		changeFilterShowStatus: (status) => dispatch(Actions.filter.changeShowStatus(status)),
		updateForm: (field, value) => dispatch(Actions.search.updateForm(field, value)),
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		setErrorObject: (errorObject) => dispatch(Actions.search.setErrorObject(errorObject)),
		locationAutocompleteRequest: (query) => dispatch(Actions.search.locationAutocompleteRequest(query)),
		setLocation: (location) => dispatch(Actions.search.setLocation(location)),
		clearSearch: () => dispatch(Actions.search.clearSearchPage()),
	}),
)(SearchFormContainer);
