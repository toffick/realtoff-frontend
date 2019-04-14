import { REALTY_TYPES } from '../constants/OfferConstants';
import NormalizeHelper from '../helpers/NormalizeHelper';

export const offerSelector = (state) => {
	const { location, description: descr, personal } = state.offer.toJS();

	const {
		isFlat, floor, totalFloorNumber, permitsMask, description, totalRoomNumber,
		squareTotal,
	} = descr;

	const { pricePerMonth, currency, additionalPhoneNumber } = personal;


	const [longitude, latitude] = location.coordinates;

	// TODO address
	return {
		address: null,
		type: isFlat ? REALTY_TYPES.FLAT : REALTY_TYPES.HOUSE,
		...location.address,
		coordinates: { latitude, longitude },
		floor_number: floor,
		floor_total: totalFloorNumber,
		permits_mask: permitsMask,
		description,
		price_per_month: pricePerMonth,
		currency,
		additional_telephone_number: additionalPhoneNumber,
		room_total: totalRoomNumber,
		square_total: squareTotal,
	};
};
export const searchCountrySelector = (state) => {
	const availableCountries = state.search.get('availableCountries');
	const countryMeta = state.search.get('countryMeta');

	return availableCountries.find((item) => item.country === countryMeta.country);
};
export const searchCitySelector = (state) => state.search.get('city');

export const searchRequestSelector = (state) => {
	const queryObj = state.search.get('form');
	const countryMeta = state.search.get('countryMeta');
	const city = state.search.get('city');
	const normalizedParameters = NormalizeHelper.removeEmptyValuesField(queryObj);

	return { ...normalizedParameters, countryCode: countryMeta.code, city };
};
