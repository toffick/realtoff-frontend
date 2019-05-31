import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ReactAutocomplete from 'react-autocomplete';

const autoCompleteMenuStyles = {
	maxWidth: '100%',
	display: ' block',
	width: ' 100%',
	fontSize: ' 1rem',
	fontWeight: ' 400',
	color: ' #495057',
	backgroundColor: ' #fff',
	backgroundClip: ' padding-box',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
	zIndex: 9999,
};

class LocationForm extends Component {

	isChanged = false;
	state = { value: '' }

	onChange = (e) => {
		this.isChanged = true;
		const { value } = e.target;
		this.setState({ value });
		this.props.onAddressChange(value);
	}

	onSelect = (title, object) => {
		this.setState({ value: title });
		this.props.onLocationChange(object);
	}

	render() {
		// TODO errorObject
		const { autocomleteList, location, errorObject } = this.props;

		return (
			<Form>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label >Введите полный адрес недвижимости</Form.Label>
					<Form.Row>
						<ReactAutocomplete
							wrapperStyle={autoCompleteMenuStyles}
							items={autocomleteList}
							getItemValue={(item) => item.description}
							renderItem={(item, highlighted) =>
								(<div
									key={item.id}
									style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
								>
									{item.description}
								</div>)
							}
							value={this.isChanged ? this.state.value : location.description}
							onChange={this.onChange}
							onSelect={this.onSelect}
							inputProps={{ className: 'form-control' }}
						/>
					</Form.Row>
				</Form.Group>

			</Form>
		);
	}

}

LocationForm.propTypes = {
	location: PropTypes.object,
	autocomleteList: PropTypes.array,
	onAddressChange: PropTypes.func.isRequired,
	onLocationChange: PropTypes.func.isRequired,
};

LocationForm.defaultProps = {
	autocomleteList: [],
	location: {},
};

export default LocationForm;
