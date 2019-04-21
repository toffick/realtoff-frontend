import { REALTY_TYPES } from '../constants/OfferConstants';
import NormalizeHelper from '../helpers/NormalizeHelper';

export const offerSelector = (state) => {
	const { location, description: descr, personal } = state.offerCreate.toJS();

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

export const searchRequestSelector = (state) => {
	const queryObj = state.search.get('form');
	const location = state.search.get('location');
	const normalizedParameters = NormalizeHelper.removeEmptyValuesFields(queryObj);

	const { country_code, city } = location.address;
	return { ...normalizedParameters, countryCode: country_code, city };
};

export const offerIdSelector = (state)=> state.offerPage.get('offer').id;
