import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DescriptionForm from '../../components/Form/CreateOffer/DescriptionForm';

import Actions from '../../actions';

class OfferDescription extends Component {

	changeDescriptionHandler = (newDescription) => {
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
	}),
)(OfferDescription);
