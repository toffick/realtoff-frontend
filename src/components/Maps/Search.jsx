import React, { Component } from 'react';
import {
	YMaps,
	Map,
	Placemark,
} from 'react-yandex-maps';
import PropTypes from 'prop-types';

class SearchMap extends Component {

	mapRef = null;

	render() {
		const { bounds, coordinates } = this.props;

		const mapParameters = { center: [53.9, 27.56659] };

		return (

			<YMaps>
				<Map
					defaultState={mapParameters}
					width="35vw"
					height="40vh"
					instanceRef={(ref) => {
						this.mapRef = ref;
					}}
				/>
			</YMaps>

		);
	}

}

SearchMap.propTypes = {
	bounds: PropTypes.array,
	coordinates: PropTypes.array,
};

SearchMap.defaultProps = {
	bounds: [[], []],
	coordinates: [],
};

export default SearchMap;
