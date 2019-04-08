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
		const { personal, errors } = this.props;
		return (
			<div className="">
				<PersonalForm onChange={this.changePersonalHandler} personal={personal} errors={errors}/>
			</div>
		);
	}

}

OfferPersonal.propTypes = {
	errors: PropTypes.array,
	personal: PropTypes.object.isRequired,
	updatePersonal: PropTypes.func.isRequired,
};

OfferPersonal.defaultProps = {
	errors: []
};

export default connect(
	(state) => ({
		personal: state.offer.get('personal'),
	}),
	(dispatch) => ({
		updatePersonal: (personal) => dispatch(Actions.offer.updatePersonal(personal)),
	}),
)(OfferPersonal);
