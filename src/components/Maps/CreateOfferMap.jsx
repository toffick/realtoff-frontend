import React, { Component } from 'react';
import {
	YMaps,
	Map,
	Placemark,
} from 'react-yandex-maps';
import PropTypes from 'prop-types';

class CreateOfferMap extends Component {

	mapRef = null;

	shouldComponentUpdate(nextProps) {
		const [[prevLat, prevLong]] = this.props.bounds;
		const [[nexLat, newLong]] = nextProps.bounds;

		return !(nexLat === prevLat && newLong === prevLong);
	}

	componentWillUpdate(nextProps) {
		this.mapRef.setBounds(nextProps.bounds);
	}

	render() {
		const { bounds, coordinates } = this.props;

		const mapParameters = { bounds };

		return (

			<YMaps>
				<Map
					defaultState={mapParameters}
					width="46vw"
					height="47vh"
					instanceRef={(ref) => {
						this.mapRef = ref;
					}}
				>
					<Placemark geometry={coordinates} />
				</Map>
			</YMaps>

		);
	}

}

CreateOfferMap.propTypes = {
	bounds: PropTypes.array,
	coordinates: PropTypes.array,
};

CreateOfferMap.defaultProps = {
	bounds: [[], []],
	coordinates: [],
};

export default CreateOfferMap;
