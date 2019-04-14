import React, { Component } from 'react';
import {
	YMaps,
	Map,
	Placemark,
} from 'react-yandex-maps';
import PropTypes from 'prop-types';

class SearchMap extends Component {

	mapRef = null;

	shouldComponentUpdate(nextProps) {
		const [[prevLat, prevLong]] = this.props.bounds;
		const [[nexLat, newLong]] = nextProps.bounds;

		return !(nexLat === prevLat && newLong === prevLong)
			|| this.props.queryUri !== nextProps.queryUri;
	}

	componentWillUpdate(nextProps) {
		this.mapRef.setBounds(nextProps.location.bounds);
	}

	renderPlacemark = (offers) => offers.map((offer, i) =>
		(<Placemark
			key={i}
			geometry={offer.coordinates.coordinates}
			onClick={() => this.props.onSelectOffer(offer.id)}
		/>))

	render() {
		const { location, offers, onInit } = this.props;
		const { bounds, coordinates } = location;

		const mapParameters = { center: coordinates, bounds, zoom: 11 };

		return (
			<YMaps>
				<Map
					defaultState={mapParameters}
					width="40vw"
					height="40vh"
					instanceRef={(ref) => {
						this.mapRef = ref;
						onInit();
					}}
				>
					{
						offers.length ?
							this.renderPlacemark(offers)
							:
							null
					}
				</Map>
			</YMaps>

		);
	}

}

SearchMap.propTypes = {
	bounds: PropTypes.array,
	coordinates: PropTypes.array,
	location: PropTypes.object,
	onInit: PropTypes.func,
	onSelectOffer: PropTypes.func.isRequired,
};

SearchMap.defaultProps = {
	bounds: [[], []],
	coordinates: [],
	onInit: () => {
	},
};

export default SearchMap;
