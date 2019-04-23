import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import ReactAutocomplete from 'react-autocomplete';

import Actions from '../../actions';

class SearchInput extends React.Component {

	state = { address: '', isAddressHasTyped: false }

	onChangeAddress = (e) => {
		const { value } = e.target;
		this.setState({ address: value, isAddressHasTyped: true });
		this.props.onAddressQueryChange(value);
	}

	onSelectAddress = (title, object) => {
		this.setState({ address: title, isAddressHasTyped: false });
		this.props.onSetLocation(object);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location && !nextProps.location) {
			this.setState({ address: '', isAddressHasTyped: false });
		}
	}

	render() {
		const { autoCompleteMenuStyles, location, autocomleteList } = this.props;
		const { isAddressHasTyped } = this.state;

		const addressValue = location &&
		!isAddressHasTyped ?
			`${location.address.country}${location.address.city ? `, ${location.address.city}` : ''}`
			: this.state.address;

		return (
			<ReactAutocomplete
				wrapperStyle={autoCompleteMenuStyles}
				items={autocomleteList}
				getItemValue={({ address }) => `${address.country}${address.city ? `, ${address.city}` : ''}`}
				renderItem={(item, highlighted) =>
					(<div
						key={item.id}
						style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
					>
						{item.description}
					</div>)
				}
				value={addressValue}
				onChange={this.onChangeAddress}
				onSelect={this.onSelectAddress}
				inputProps={{ className: 'form-control', placeholder: 'Введите город...' }}
			/>
		);
	}

}

SearchInput.propTypes = {
	autoCompleteMenuStyles: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	onAddressQueryChange: PropTypes.func.isRequired,
	onSetLocation: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		location: state.search.get('location'),
		autocomleteList: state.search.get('autocomleteList'),
	}),
	(dispatch) => ({
		searchRequest: () => dispatch(Actions.search.searchRequest()),
		locationAutocompleteRequest: (query) => dispatch(Actions.search.locationAutocompleteRequest(query)),
		setLocation: (location) => dispatch(Actions.search.setLocation(location)),
	}),
)(SearchInput);
