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

		return !(nexLat === prevLat && newLong === prevLong)
	}

	componentWillUpdate(nextProps) {
		this.mapRef.setZoom(12);
		this.mapRef.setCenter(nextProps.coordinates);
	}

	render() {
		const { coordinates, width, heigth } = this.props;

		const mapParameters = { center: coordinates, zoom: 12 };

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
};

OfferMap.defaultProps = {
	bounds: [[], []],
	coordinates: [],
	width: '46vw',
	heigth: '47vh',
};

export default OfferMap;
