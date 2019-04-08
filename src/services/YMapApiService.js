/* eslint-disable no-undef */
import axios from 'axios';

class YMapApi {

	constructor() {
		this.apiUrl = 'https://geocode-maps.yandex.ru/1.x/?format=json';
	}


	/**
	 *
	 * @param query
	 * @returns {AxiosPromise<any>}
	 */
	async getAutocompleteListByQuery(query) {

		const normalizedQuery = query.replace(/[\s,]/g, '+');
		const result = await axios.request({
			method: 'GET',
			url: this.apiUrl,
			params: {
				format: 'json',
				geocode: normalizedQuery,
			},
		});

		const { data: { response } } = result;

		const coordinatesResults = this._deserializeQueryResponse(response);

		return coordinatesResults;
	}

	async _deserializeQueryResponse(response) {
		const { GeoObjectCollection: { featureMember } } = response;

		const filteredValues = featureMember.slice(0, 5);

		const result = [];
		filteredValues.map((object) => {
			const searchItem = { address: {}, description: '' };

			const {
				GeoObject: {
					Point: point, boundedBy,
					metaDataProperty: { GeocoderMetaData: geocoderMetaData },
				},
			} = object;

			const { Address: { Components: addressComponents } } = geocoderMetaData;

			addressComponents.forEach((addressItem) => {
				const { kind, name } = addressItem;
				switch (kind) {
					case 'country':
						searchItem.address.country = name;
						searchItem.description += name;
						return;
					case 'locality':
						searchItem.address.city = name;
						searchItem.description += ` ${name}`;
						return;
					case 'street':
						searchItem.address.street = name;
						searchItem.description += ` ${name}`;
						return;
					case 'house':
						searchItem.address.house_number = name;
						searchItem.description += ` ${name}`;

				}
			});

			if (result.find((item) => item.description === searchItem.description)) {
				return false;
			}

			const [lat, long] = point.pos.split(' ');

			const { upperCorner, lowerCorner } = boundedBy.Envelope;
			const [latUpper, longUpper] = upperCorner.split(' ');
			const [latLower, longLower] = lowerCorner.split(' ');

			searchItem.coordinates = [+long, +lat];
			searchItem.bounds = [[+longLower, +latLower], [+longUpper, +latUpper]];

			result.push(searchItem);
		});

		return result;
	}

}

export default new YMapApi();
