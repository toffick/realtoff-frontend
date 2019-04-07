/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import { RENT_PERMITS } from '../../../constants/OfferConstants';

class PermitsForm extends Component {

	onPermitsChange = (e) => {
		const { id } = e.target;
		const numberId = Number(id);
		const { permitsMask } = this.props;

		const newMask = permitsMask & numberId ?
			permitsMask ^ numberId
			:
			permitsMask | numberId;

		this.props.onChangeMask(newMask);
	}

	getPermitsChecks = () => {
		const permits = Object.values(RENT_PERMITS);

		return permits.map((permit) => {
			const { permitsMask } = this.props;
			const { flag, label } = permit;

			return (<Form.Check
				label={label.toLocaleLowerCase()}
				type="checkbox"
				id={flag}
				onChange={this.onPermitsChange}
				checked={permitsMask & flag}
			/>);
		});
	}

	render() {

		return (
			<Form>
				<Form.Group>
					<Form.Label>Check the advantages of your realty</Form.Label>
					{this.getPermitsChecks()}
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
