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
		const { description, errors } = this.props;
		return (
			<div className="">
				<DescriptionForm onChange={this.changeDescriptionHandler} description={description} errors={errors}/>
			</div>
		);
	}

}

OfferDescription.propTypes = {
	errors: PropTypes.array,
	description: PropTypes.object.isRequired,
	updateDescription: PropTypes.func.isRequired,
};

OfferDescription.defaultProps = {
	errors: []
};

export default connect(
	(state) => ({
		description: state.offerCreate.get('description'),
	}),
	(dispatch) => ({
		updateDescription: (description) => dispatch(Actions.offerCreate.updateDescription(description)),
	}),
)(OfferDescription);
