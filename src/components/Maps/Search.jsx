import React, { Component } from 'react';
import {
	YMaps,
	Map,
	Placemark,
} from 'react-yandex-maps';
import PropTypes from 'prop-types';

import { MINSK_COORDINATES } from '../../constants/MapConstants';
import NormalizeHelper from "../../helpers/NormalizeHelper";

class SearchMap extends Component {

	mapRef = null;

	shouldComponentUpdate(nextProps) {
		const [prevLat, prevLong] = this.props.coordinates;
		const [nexLat, newLong] = nextProps.coordinates;

		return !(nexLat === prevLat && newLong === prevLong)
			|| this.props.queryUri !== nextProps.queryUri;
	}

	componentWillUpdate(nextProps) {
		if (this.mapRef) {
			this.mapRef.setCenter(nextProps.coordinates, 12);
		}
	}

	renderPlacemarks = (offers) => offers.map((offer) =>
		(<Placemark
			key={offer.id}
			geometry={offer.coordinates.coordinates}
			onClick={() => this.props.onSelectOffer(offer.id)}
		/>))

	render() {
		const { coordinates, offers, onInit } = this.props;

		const mapParameters = { center: coordinates, zoom: 12 };

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
	coordinates: PropTypes.object,
	onSelectOffer: PropTypes.func.isRequired,
};

SearchMap.defaultProps = {
	queryUri: '',
	offers: [],
	coordinates: MINSK_COORDINATES,
	onInit: () => {
	},
};

export default SearchMap;
