/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import { RENT_PERMITS } from '../../../constants/OfferConstants';
import PermitsList from '../../PermitsList';

class PermitsForm extends Component {

	render() {
		const { permitsMask, onChangeMask } = this.props;
		return (
			<Form>
				<Form.Group>
					<Form.Label>Check the advantages of your realty</Form.Label>
					<PermitsList permitsMask={permitsMask} onChangeMask={onChangeMask} />
				</Form.Group>
			</Form>
		);
	}

}

PermitsForm.propTypes = {
	permitsMask: PropTypes.number,
	onChangeMask: PropTypes.func,
};

PermitsForm.defaultProps = {
	permitsMask: 0,
	onChangeMask: () => {
	},
};

export default PermitsForm;
