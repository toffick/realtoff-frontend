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
		const [prevLat, prevLong] = this.props.location.coordinates;
		const [nexLat, newLong] = nextProps.location.coordinates;

		return !(nexLat === prevLat && newLong === prevLong)
			|| this.props.queryUri !== nextProps.queryUri;
	}

	componentWillUpdate(nextProps) {
		// TODO тут ошибка вылетела setZoom is undefined
		this.mapRef.setZoom(11);
		this.mapRef.setCenter(nextProps.location.coordinates);
	}

	renderPlacemarks = (offers) => offers.map((offer) =>
		(<Placemark
			key={offer.id}
			geometry={offer.coordinates.coordinates}
			onClick={() => this.props.onSelectOffer(offer.id)}
		/>))

	render() {
		const { location, offers, onInit } = this.props;
		const { coordinates } = location;

		const mapParameters = { center: coordinates, zoom: 11 };

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
							this.renderPlacemarks(offers)
							:
							null
					}
				</Map>
			</YMaps>

		);
	}

}

SearchMap.propTypes = {
	offers: PropTypes.array,
	queryUri: PropTypes.string,
	onInit: PropTypes.func,
	location: PropTypes.object.isRequired,
	onSelectOffer: PropTypes.func.isRequired,
};

SearchMap.defaultProps = {
	queryUri: '',
	offers: [],
	onInit: () => {
	},
};

export default SearchMap;
