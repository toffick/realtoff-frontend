import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateOfferMap from '../../components/Maps/Offer';
import LocationForm from '../../components/Form/CreateOffer/LocationForm';

import Actions from '../../actions';
import NormalizeHelper from '../../helpers/NormalizeHelper';
import ValidationHelper from '../../helpers/ValidationHelper';
import { CREATE_OFFER_STEPS } from '../../constants/OfferConstants';

class OfferLocation extends Component {

	componentWillUnmount() {
		this.props.updateAutocompleteList([]);
	}

	changeAddressHandler = (query) => {
		this.props.locationAutocompleteRequest(query);
	}

	changeLocationHandler = (location) => {

		const { setAccessToNextStep } = this.props;

		if (ValidationHelper.checkCreateOfferLocationNextAccess(location)) {
			setAccessToNextStep(true, CREATE_OFFER_STEPS.LOCATION.id);
		} else {
			setAccessToNextStep(false, CREATE_OFFER_STEPS.LOCATION.id);
		}

		this.props.setLocation(location);
	}

	render() {

		const { autocomleteList, location, errorObject } = this.props;
		const { coordinates } = location;

		return (
			<div className="location-wrap">
				<div className="location-form-wrap">
					<LocationForm
						onAddressChange={this.changeAddressHandler}
						onLocationChange={this.changeLocationHandler}
						autocomleteList={autocomleteList}
						location={location}
						errorObject={errorObject}
					/>
				</div>
				<div className="map-wrap">
					<CreateOfferMap
						width={1060}
						heigth={450}
						coordinates={coordinates}
					/>
				</div>
			</div>

		);
	}


}

OfferLocation.propTypes = {
	location: PropTypes.object,
	errorObject: PropTypes.object,
	coordinates: PropTypes.array,
	autocomleteList: PropTypes.array,
	locationAutocompleteRequest: PropTypes.func.isRequired,
	updateAutocompleteList: PropTypes.func.isRequired,
	setAccessToNextStep: PropTypes.func.isRequired,
};

OfferLocation.defaultProps = {
	location: {},
	coordinates: [],
	autocomleteList: [],
};

export default connect(
	(state) => ({
		errorObject: state.offerCreate.get('errorObject'),
		location: state.offerCreate.get('location'),
		autocomleteList: state.offerCreate.get('autocomleteList'),
		coordinates: state.offerCreate.get('coordinates'),
	}),
	(dispatch) => ({
		locationAutocompleteRequest: (query) => dispatch(Actions.offerCreate.locationAutocompleteRequest(query)),
		setLocation: (location) => dispatch(Actions.offerCreate.setLocation(location)),
		updateAutocompleteList: (list) => dispatch(Actions.offerCreate.updateAutocompleteList(list)),
		setAccessToNextStep: (state, scenario) => dispatch(Actions.offerCreate.setAccessToNextStep(state, scenario)),
	}),
)(OfferLocation);
