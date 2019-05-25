import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PersonalForm from '../../components/Form/CreateOffer/PersonalForm';

import Actions from '../../actions';
import { CREATE_OFFER_STEPS } from '../../constants/OfferConstants';

class OfferPersonal extends Component {

	changePersonalHandler = (newDescription) => {
		const { setAccessToNextStep } = this.props;

		if (newDescription.pricePerMonth.length) {
			setAccessToNextStep(true, CREATE_OFFER_STEPS.PERSONAL.id);
		} else {
			setAccessToNextStep(false, CREATE_OFFER_STEPS.PERSONAL.id);
		}

		this.props.updatePersonal(newDescription);
	}

	render() {
		const { personal, errorObject } = this.props;
		return (
			<div className="">
				<PersonalForm
					onChange={this.changePersonalHandler}
					personal={personal}
					errorObject={errorObject}
				/>
			</div>
		);
	}

}

OfferPersonal.propTypes = {
	errors: PropTypes.array,
	errorObject: PropTypes.object,
	personal: PropTypes.object.isRequired,
	updatePersonal: PropTypes.func.isRequired,
	setAccessToNextStep: PropTypes.func.isRequired,
};

OfferPersonal.defaultProps = {
	errors: [],
};

export default connect(
	(state) => ({
		personal: state.offerCreate.get('personal'),
		errorObject: state.offerCreate.get('errorObject'),
	}),
	(dispatch) => ({
		updatePersonal: (personal) => dispatch(Actions.offerCreate.updatePersonal(personal)),
		setAccessToNextStep: (state, scenario) => dispatch(Actions.offerCreate.setAccessToNextStep(state, scenario)),
	}),
)(OfferPersonal);
