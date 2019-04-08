
import { REALTY_TYPES } from '../constants/OfferConstants';

export const offerSelector = (state) => {
	const { location, description: descr, personal } = state.offer.toJS();

	const {
		isFlat, floor, totalFloorNumber, permitsMask, description, totalRoomNumber,
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
	};
};
