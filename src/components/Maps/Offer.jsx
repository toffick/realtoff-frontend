import React, { Component } from 'react';
import {
	YMaps,
	Map,
	Placemark,
} from 'react-yandex-maps';
import PropTypes from 'prop-types';

class OfferMap extends Component {

	mapRef = null;

	shouldComponentUpdate(nextProps) {
		const [prevLat, prevLong] = this.props.coordinates;
		const [nexLat, newLong] = nextProps.coordinates;

		return !(nexLat === prevLat && newLong === prevLong);
	}

	componentWillUpdate(nextProps) {
		this.mapRef.setCenter(nextProps.coordinates, 16); // to constant
	}

	render() {
		const { coordinates, width, heigth, zoom } = this.props;

		const mapParameters = { center: coordinates, zoom };

		return (
			<YMaps>
				<Map
					defaultState={mapParameters}
					width={width}
					height={heigth}
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

OfferMap.propTypes = {
	bounds: PropTypes.array,
	coordinates: PropTypes.array,
	width: PropTypes.string,
	heigth: PropTypes.string,
	zoom: PropTypes.number,
};

OfferMap.defaultProps = {
	bounds: [[], []],
	coordinates: [],
	width: '46vw',
	heigth: '47vh',
	zoom: 12
};

export default OfferMap;
