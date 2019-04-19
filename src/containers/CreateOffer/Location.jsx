import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateOfferMap from '../../components/Maps/Offer';
import LocationForm from '../../components/Form/CreateOffer/LocationForm';

import Actions from '../../actions';

class OfferLocation extends Component {

	componentWillUnmount(){
		this.props.updateAutocompleteList([]);
	}

	changeAddressHandler = (query) => {
		this.props.locationAutocompleteRequest(query);
	}

	changeLocationHandler = (location) => {
		this.props.setLocation(location);
	}

	render() {

		const { autocomleteList, location } = this.props;
		const { coordinates, bounds } = location;

		return (
			<div className="location-wrap">
				<div className="location-form-wrap">
					<LocationForm
						onAddressChange={this.changeAddressHandler}
						onLocationChange={this.changeLocationHandler}
						autocomleteList={autocomleteList}
						location={location}
					/>
				</div>
				<div className="map-wrap">
					<CreateOfferMap
						coordinates={coordinates}
						bounds={bounds}
					/>
				</div>
			</div>

		);
	}


}

OfferLocation.propTypes = {
	location: PropTypes.object,
	coordinates: PropTypes.array,
	autocomleteList: PropTypes.array,
	locationAutocompleteRequest: PropTypes.func.isRequired,
	updateAutocompleteList: PropTypes.func.isRequired,
};

OfferLocation.defaultProps = {
	location: {},
	coordinates: [],
	autocomleteList: [],
};

export default connect(
	(state) => ({
		location: state.offerCreate.get('location'),
		autocomleteList: state.offerCreate.get('autocomleteList'),
		coordinates: state.offerCreate.get('coordinates'),
	}),
	(dispatch) => ({
		locationAutocompleteRequest: (query) => dispatch(Actions.offerCreate.locationAutocompleteRequest(query)),
		setLocation: (location) => dispatch(Actions.offerCreate.setLocation(location)),
		updateAutocompleteList: (list) => dispatch(Actions.offerCreate.updateAutocompleteList(list)),
	}),
)(OfferLocation);
