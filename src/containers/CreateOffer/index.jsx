import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OfferLocation from './Location';
import OfferDescription from './Description';
import OfferPersonal from './Personal';

import Actions from '../../actions';
import { CREATE_OFFER_STEPS } from '../../constants/OfferConstants';


const STEPS_SCENARIO = [
	CREATE_OFFER_STEPS.LOCATION,
	CREATE_OFFER_STEPS.DETAILS,
	CREATE_OFFER_STEPS.PERSONAL,
];

class CreateOffer extends Component {

	componentWillUnmount() {
		this.props.clearOfferForm();
	}

	_getNavigationHandlers = () => {
		const { step, changeOfferStep } = this.props;
		const stepIndex = STEPS_SCENARIO.findIndex((item) => step === item);

		if (stepIndex === 0) {
			return (
				<React.Fragment>
					<div className="navigate-button-wrap" />
					<div className="navigate-button-wrap">
						<div className="item next" onClick={() => changeOfferStep(STEPS_SCENARIO[1])}>
							Далее
						</div>
					</div>
				</React.Fragment>
			);
		} else if (stepIndex === STEPS_SCENARIO.length - 1) {
			return (
				<React.Fragment>
					<div className="navigate-button-wrap">
						<div className="item back" onClick={() => changeOfferStep(STEPS_SCENARIO[stepIndex - 1])}>
							Назад
						</div>
					</div>
					<div className="navigate-button-wrap">
						<div className="item" onClick={this.onSubmit}>
							Создать
						</div>
					</div>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div className="navigate-button-wrap">
					<div className="item back" onClick={() => changeOfferStep(STEPS_SCENARIO[stepIndex - 1])}>
						Назад
					</div>
				</div>
				<div className="navigate-button-wrap">
					<div className="item next" onClick={() => changeOfferStep(STEPS_SCENARIO[stepIndex + 1])}>
						Далее
					</div>
				</div>
			</React.Fragment>);

	}

	onSubmit = () => {
		// todo validation
		this.props.createOffer();
	}

	render() {
		const { step } = this.props;

		const stepComponent = (() => {
			switch (step) {
				case CREATE_OFFER_STEPS.LOCATION:
					return (<OfferLocation />);
				case CREATE_OFFER_STEPS.DETAILS:
					return (<OfferDescription />);
				case CREATE_OFFER_STEPS.PERSONAL:
					return (<OfferPersonal />);
				default:
					return (<OfferLocation />);
			}
		})();

		return (
			<div className="offer">
				<h2>{step.title}</h2>
				<div className="step-wrap">
					{stepComponent}
				</div>
				<div className="step-navigator">
					{this._getNavigationHandlers()}
				</div>
			</div>
		);
	}

}

CreateOffer.propTypes = {
	step: PropTypes.string,
	changeOfferStep: PropTypes.func.isRequired,
	createOffer: PropTypes.func.isRequired,
	clearOfferForm: PropTypes.func.isRequired,
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
		createOffer: () => dispatch(Actions.offer.createOffer()),
		clearOfferForm: () => dispatch(Actions.offer.clearOfferForm()),

	}),
)(CreateOffer);
