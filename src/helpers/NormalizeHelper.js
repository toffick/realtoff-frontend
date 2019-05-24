import { REALTY_TYPES } from '../constants/OfferConstants';

class NormalizeHelper {

	static removeEmptyValuesFields(object) {
		const copyObject = { ...object };

		Object.keys(copyObject).forEach((key) => (!copyObject[key] || copyObject[key].length === 0 ? delete copyObject[key] : null));

		return copyObject;
	}

	static removeUndefinedValuesFields(object) {
		const copyObject = { ...object };

		Object.keys(copyObject).forEach((key) => (copyObject[key] === undefined ? delete copyObject[key] : null));

		return copyObject;
	}

	static getAddressTitle(addressObject) {
		const { city, street, house_number: houseNumber } = addressObject;
		const cityFromCapital = city.charAt(0).toUpperCase() + city.slice(1);
		return `${cityFromCapital}, ${street} ${houseNumber}`;
	}

	static getNumberStringSuffix(number, type) {
		switch (type) {
			case REALTY_TYPES.FLAT: {
				return `${number}-комнатная квартира`;
			}
			case REALTY_TYPES.HOUSE: {
				return `${number}-комнатный дом`;
			}

			default: return '';
		}

	}

}

export default NormalizeHelper;
