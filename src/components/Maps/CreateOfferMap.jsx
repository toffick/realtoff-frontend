import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';

export default (props) => {

	const { defaultCoordinates } = props;

	return (
		<YMaps >
			<Map defaultState={{ center: defaultCoordinates, zoom: 9 }} width="66vw" height="47vh" />
		</YMaps>
	);
};
