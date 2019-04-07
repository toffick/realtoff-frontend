import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DescriptionForm from '../../components/Form/CreateOffer/DescriptionForm';

import Actions from '../../actions';

class OfferDescription extends Component {

	changeDescriptionHandler = (newDescription) => {
		this.props.updatePersonal(newDescription);
	}

	render() {
		const { description } = this.props;
		return (
			<div className="">
				<DescriptionForm onChange={this.changeDescriptionHandler} description={description} />
			</div>
		);
	}

}

OfferDescription.propTypes = {
	description: PropTypes.object.isRequired,
	changeOfferStep: PropTypes.func.isRequired,
	updatePersonal: PropTypes.func.isRequired,
};

OfferDescription.defaultProps = {};

export default connect(
	(state) => ({
		description: state.offer.get('description'),
	}),
	(dispatch) => ({
		changeOfferStep: (step) => dispatch(Actions.offer.changeOfferStep(step)),
		updatePersonal: (description) => dispatch(Actions.offer.updatePersonal(description)),
	}),
)(OfferDescription);
