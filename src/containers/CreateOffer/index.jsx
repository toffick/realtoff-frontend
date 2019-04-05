import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OfferLocation from './Location';
import OfferDescription from './Description';
import OfferPersonal from './Personal';

import Actions from '../../actions';
import { CREATE_OFFER_STEPS } from '../../constants/GlobalConstants';

class CreateOffer extends Component {

	render() {

		// city,
		// 	street,
		// 	houseNumber,
		// 	currency,
		// 	coordinates,

		// 	type,
		// 	floorNumber: Number(floorNumber),
		// 	floorTotal: Number(floorTotal),
		// 	roomTotal: Number(roomTotal),
		// 	permitsMask,
		// 	description,

		// 	pricePerMonth,
		// 	additionalTelephoneNumber,

		const { step } = this.props;

		const stepComponent = (() => {
			switch (step) {
				case CREATE_OFFER_STEPS.LOCATION:
					return (<OfferLocation />);

				case CREATE_OFFER_STEPS.PERMITS_DESCRIPTION:
					return (<OfferDescription />);

				case CREATE_OFFER_STEPS.PERSONAL:
					return (<OfferPersonal />);
			}
		})();

		return (
			<div className="offer">
				<h2>Location</h2>
				<div className="step-wrap">
					{stepComponent}
				</div>
				<div className="step-navigator">
					<div className="back ">Back</div>
					<div className="next">Next</div>
				</div>
			</div>

		);
	}

}

CreateOffer.propTypes = {
	step: PropTypes.string,
	changeOfferStep: PropTypes.func.isRequired,
};

CreateOffer.defaultProps = {
	step: '',
};

export default connect(
	(state) => ({
		step: state.offer.get('step'),
	}),
	(dispatch) => ({
		changeOfferStep: (step) => dispatch(Actions.offer.changeOfferStep(step)),
	}),
)(CreateOffer);
