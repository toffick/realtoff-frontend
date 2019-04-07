import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PersonalForm from '../../components/Form/CreateOffer/PersonalForm';

import Actions from '../../actions';

class OfferPersonal extends Component {

	changePersonalHandler = (newDescription) => {
		this.props.updatePersonal(newDescription);
	}

	render() {
		const { personal } = this.props;
		return (
			<div className="">
				<PersonalForm onChange={this.changePersonalHandler} personal={personal} />
			</div>
		);
	}

}

OfferPersonal.propTypes = {
	personal: PropTypes.object.isRequired,
	changeOfferStep: PropTypes.func.isRequired,
	updatePersonal: PropTypes.func.isRequired,
};

OfferPersonal.defaultProps = {};

export default connect(
	(state) => ({
		personal: state.offer.get('personal'),
	}),
	(dispatch) => ({
		changeOfferStep: (step) => dispatch(Actions.offer.changeOfferStep(step)),
		updatePersonal: (personal) => dispatch(Actions.offer.updatePersonal(personal)),
	}),
)(OfferPersonal);
