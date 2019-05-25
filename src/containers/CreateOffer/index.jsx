import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OfferLocation from './Location';
import OfferDescription from './Description';
import OfferPersonal from './Personal';

import Actions from '../../actions';
import { CREATE_OFFER_STEPS } from '../../constants/OfferConstants';
import { offerSelector } from '../../reducers/selectors';
import ValidationHelper from '../../helpers/ValidationHelper';
import Form from "react-bootstrap/es/Form";


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
		const { personal, description } = this.props;

		const validInfo = ValidationHelper.validateCreateOfferRequest(personal, description);
		if (validInfo.isValid) {
			this.props.createOffer();
		} else {
			this.props.setOfferErrors(validInfo.errorsMap);
		}
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
			<div className="offer-create-page-wrapper">
				<div className="offer-create">
					<h2  style={{padding: '10px 0 0 10px'}}>{step.title}</h2>
					<div className="step-wrap">
						{stepComponent}
					</div>

				</div>
				<div className="step-navigator-container">
					<hr />
					<div className="step-navigator">
						{this._getNavigationHandlers()}
					</div>
				</div>
			</div>
		);
	}

}

CreateOffer.propTypes = {
	step: PropTypes.string,
	offerTemplate: PropTypes.object,
	changeOfferStep: PropTypes.func.isRequired,
	createOffer: PropTypes.func.isRequired,
	clearOfferForm: PropTypes.func.isRequired,
	setOfferErrors: PropTypes.func.isRequired,
};

CreateOffer.defaultProps = {
	step: '',
	offerTemplate: {},
};

export default connect(
	(state) => ({
		step: state.offerCreate.get('step'),
		offerTemplate: offerSelector(state),
		personal: state.offerCreate.get('personal'),
		description: state.offerCreate.get('description'),
	}),
	(dispatch) => ({
		changeOfferStep: (step) => dispatch(Actions.offerCreate.changeOfferStep(step)),
		createOffer: () => dispatch(Actions.offerCreate.createOffer()),
		clearOfferForm: () => dispatch(Actions.offerCreate.clearOfferForm()),
		setOfferErrors: (errorsObject) => dispatch(Actions.offerCreate.setOfferErrors(errorsObject)),
	}),
)(CreateOffer);
