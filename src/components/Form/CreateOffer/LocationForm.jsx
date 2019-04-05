import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import ErrorMessage from '../../ErrorMessage/index';
import LoadingButton from '../../Elements/LoadingButton';

class LocationForm extends Component {

	onChange=(e) => {
		const { value } = e.target;
		this.props.onAddressChange(value);
	}

	render() {

		return (
			<Form>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Enter address</Form.Label>
					<Form.Control type="text" placeholder="Minsk, Lenina" onChange={this.onChange} />
				</Form.Group>

			</Form>
		);
	}

}

LocationForm.propTypes = {
	onAddressChange: PropTypes.func.isRequired,
};

LocationForm.defaultProps = {
};

export default LocationForm;
