/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import { RENT_PERMITS } from '../../constants/OfferConstants';

class PermitsList extends Component {

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

		const { permitsMask } = this.props;

		return permits.map((permit) => {
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
		return (this.getPermitsChecks());
	}

}

PermitsList.propTypes = {
	permitsMask: PropTypes.number,
	onChangeMask: PropTypes.func,
};

PermitsList.defaultProps = {
	permitsMask: 0,
	onChangeMask: () => {
	},
};

export default PermitsList;
