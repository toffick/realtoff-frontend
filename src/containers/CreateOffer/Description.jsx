import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DescriptionForm from '../../components/Form/CreateOffer/DescriptionForm';

import Actions from '../../actions';
import ValidationHelper from "../../helpers/ValidationHelper";
import { CREATE_OFFER_STEPS } from "../../constants/OfferConstants";

class OfferDescription extends Component {

	changeDescriptionHandler = (newDescription) => {

		const { setAccessToNextStep, description } = this.props;

		if (ValidationHelper.checkCreateOfferDetailsNextAccess(description, newDescription)) {
			setAccessToNextStep(true, CREATE_OFFER_STEPS.DETAILS.id);
		} else {
			setAccessToNextStep(false, CREATE_OFFER_STEPS.DETAILS.id);
		}

		this.props.updateDescription(newDescription);
	}

	render() {
		const { description, errorObject } = this.props;

		return (
			<div className="">
				<DescriptionForm
					onChange={this.changeDescriptionHandler}
					description={description}
					errorObject={errorObject}
				/>
			</div>
		);
	}

}

OfferDescription.propTypes = {
	errors: PropTypes.array,
	errorObject: PropTypes.object,
	description: PropTypes.object.isRequired,
	updateDescription: PropTypes.func.isRequired,
	setAccessToNextStep: PropTypes.func.isRequired,
};

OfferDescription.defaultProps = {
	errors: [],
};

export default connect(
	(state) => ({
		description: state.offerCreate.get('description'),
		errorObject: state.offerCreate.get('errorObject'),
	}),
	(dispatch) => ({
		updateDescription: (description) => dispatch(Actions.offerCreate.updateDescription(description)),
		setAccessToNextStep: (state, scenario) => dispatch(Actions.offerCreate.setAccessToNextStep(state, scenario)),
	}),
)(OfferDescription);
