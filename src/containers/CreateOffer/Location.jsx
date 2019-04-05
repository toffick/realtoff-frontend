import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreateOfferMap from '../../components/Maps/CreateOfferMap';
import LocationForm from '../../components/Form/CreateOffer/LocationForm';

import connect from 'react-redux/es/connect/connect';
import Actions from '../../actions';

class OfferLocation extends Component {

	changeAddressHandler = (address) => {
		console.log(address);
	}

	render() {

		const { coordinates } = this.props;

		return (
			<div className="location-wrap">
				<div className="location-form-wrap">
					<LocationForm onAddressChange={this.changeAddressHandler} />
				</div>
				<div className="map-wrap">
					<CreateOfferMap defaultCoordinates={coordinates} />
				</div>
			</div>

		);
	}


}

OfferLocation.propTypes = {
	coordinates: PropTypes.array
};

OfferLocation.defaultProps = {
	coordinates: []
};

export default connect(
	(state) => ({
		coordinates: state.offer.get('coordinates'),
	}),
	(dispatch) => ({
		changeOfferStep: (step) => dispatch(Actions.offer.changeOfferStep(step)),
	}),
)(OfferLocation);
