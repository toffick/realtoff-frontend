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
	}),
)(OfferPersonal);
