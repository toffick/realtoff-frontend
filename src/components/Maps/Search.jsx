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
		const [[prevLat, prevLong]] = this.props.location.bounds;
		const [[nexLat, newLong]] = nextProps.location.bounds;

		return !(nexLat === prevLat && newLong === prevLong);
	}

	componentWillUpdate(nextProps) {
		this.mapRef.setBounds(nextProps.location.bounds);
	}


	render() {
		const { location, onInit } = this.props;
		const { bounds, coordinates, offers } = location;

		// TODO
		const mapParameters = { center: coordinates, bounds };

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
						offers && offers.length && offers.map((item) =>
							(
								<Placemark geometry={item.coordinates} />
							))
					}
				</Map>
			</YMaps>

		);
	}

}

SearchMap.propTypes = {
	bounds: PropTypes.array,
	coordinates: PropTypes.array,
	onInit: PropTypes.func,
};

SearchMap.defaultProps = {
	bounds: [[], []],
	coordinates: [],
	onInit: () => {},
};

export default SearchMap;
