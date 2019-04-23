import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from '../../actions';
import { ROUTER_PATHS } from '../../constants/GlobalConstants';
import SearchInput from '../SearchInput';

const autoCompleteMenuStyles = {
	maxWidth: '300px',
	display: ' block',
	width: ' 300px',
	fontSize: ' 1rem',
	fontWeight: ' 400',
	color: ' #495057',
	backgroundColor: ' #fff',
	backgroundClip: ' padding-box',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
	zIndex: 9999,
	height: '15px !important',
	display: 'inline-block'
};

class HeaderSearchInput extends React.Component {

	changeAddressQueryHandler = (query) => {
		this.props.locationAutocompleteRequest(query);
	}

	changeLocationHandler = (location) => {
		if (location.address.city) {
			this.props.setLocation(location);
			this.props.navigateTo(ROUTER_PATHS.INDEX);
			this.props.searchRequest();
		}
	}


	render() {
		return (
			<React.Fragment>
				<SearchInput
					onAddressQueryChange={this.changeAddressQueryHandler}
					onSetLocation={this.changeLocationHandler}
					autoCompleteMenuStyles={autoCompleteMenuStyles}
				/>
			</React.Fragment>
		);
	}

}

HeaderSearchInput.propTypes = {
	isShowFilterModal: PropTypes.bool,
	location: PropTypes.object,
	user: PropTypes.object,
	errorObject: PropTypes.object,
	form: PropTypes.object.isRequired,
	updateAvailableCountriesRequest: PropTypes.func.isRequired,
	searchRequest: PropTypes.func.isRequired,
	setErrorObject: PropTypes.func.isRequired,
	changeFilterShowStatus: PropTypes.func.isRequired,
	navigaeTo: PropTypes.func.isRequired,
};

HeaderSearchInput.defaultProps = {
	availableCountries: [],
	location: undefined,
};

export default connect(
	(state) => ({
		location: state.search.get('location'),
	}),
	(dispatch) => ({
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		locationAutocompleteRequest: (query) => dispatch(Actions.search.locationAutocompleteRequest(query)),
		setLocation: (location) => dispatch(Actions.search.setLocation(location)),
		navigateTo: (path) => dispatch(Actions.navigate.navigateTo(path)),
	}),
)(HeaderSearchInput);
