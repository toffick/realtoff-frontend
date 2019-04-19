/* eslint-disable no-undef */
import axios from 'axios';

class YMapApi {

	constructor() {
		this.apiUrl = 'https://geocode-maps.yandex.ru/1.x/?format=json&lang=ru_RU';
	}

	/**
	 *
	 * @param country
	 * @param city
	 * @returns {Promise<Location[]>}
	 */
	async getCityCoordintes(country, city) {
		const normalizedQuery = `${country}+${city}`;
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

		return coordinatesResults[0];
	}

	/**
	 *
	 * @param query
	 * @returns {[Location]}
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

	/**
	 *
	 * @param response
	 * @returns {Promise<[Location]>}
	 * @private
	 */
	_deserializeQueryResponse(response) {
		const { GeoObjectCollection: { featureMember } } = response;

		const filteredValues = featureMember.slice(0, 5);

		const result = [];
		filteredValues.map((object) => {
			const searchItem = { address: {}, description: '' };

			const {
				GeoObject: {
					Point: point,
					metaDataProperty: { GeocoderMetaData: geocoderMetaData },
				},
			} = object;

			const { Address: { Components: addressComponents, country_code: countryCode } } = geocoderMetaData;

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

			searchItem.address.country_code = countryCode;
			searchItem.coordinates = [+long, +lat];

			result.push(searchItem);
		});

		return result;
	}

}

export default new YMapApi();
