import validator from 'validator';
import iso3166 from 'iso-3166-1-alpha-2';
import {
	CURRENCY_TYPES,
	REALTY_TYPES
} from '../constants/OfferConstants';

class ValidationHelper {

	/**
	 *
	 * @param form
	 * @returns {{errorsMap: {}, isValid: boolean}}
	 */
	static validateOfferSearchRequest(form) {
		const errorObject = {errorsMap: {}, isValid: true};
		const {
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
			roomTotal,
		} = form;

		if (roomTotal.length) {
			if (!validator.isNumeric(roomTotal)) {
				errorObject.errorsMap.roomTotal = 'Комнаты должны быть числом';
			} else if (Number(roomTotal) < 1) {
				errorObject.errorsMap.roomTotal = 'Комнат не может быть меньше 1';
			}
		}

		if (priceFrom.length) {
			if (!validator.isNumeric(priceFrom)) {
				errorObject.errorsMap.priceFrom = 'Цена(от) должна быть числом';
			} else if (Number(priceFrom) < 0) {
				errorObject.errorsMap.priceFrom = 'Цена(от) должна не может быть меньше 0';
			}
		}

		if (priceTo.length) {
			if (!validator.isNumeric(priceTo)) {
				errorObject.errorsMap.priceTo = 'Цена(до) должна быть числом';
			} else if (Number(priceTo) < 0) {
				errorObject.errorsMap.priceTo = 'Цена(до) должна быть больше 0';
			} else if (validator.isNumeric(priceFrom) && Number(priceFrom) > Number(priceTo)) {
				errorObject.errorsMap.priceTo = 'Цена(от) должна быть меньше цены(до)';
			}
		}


		if (squareFrom.length) {
			if (!validator.isNumeric(squareFrom)) {
				errorObject.errorsMap.squareFrom = 'Площадь(от) должна быть числом';
			} else if (Number(squareFrom) < 0) {
				errorObject.errorsMap.squareFrom = 'Площадь(до) должна быть больше 0';
			}
		}

		if (squareTo.length) {
			if (!validator.isNumeric(squareTo)) {
				errorObject.errorsMap.squareTo = 'Площадь(до) должна быть числом';
			} else if (Number(priceFrom < 0)) {
				errorObject.errorsMap.squareTo = 'Площадь(до) должна быть больше 0';
			} else if (validator.isNumeric(squareFrom) && Number(squareFrom) > Number(squareTo)) {
				errorObject.errorsMap.squareTo = 'Площадь(от) должна быть больше площади(до)';
			}
		}

		errorObject.isValid = !Object.keys(errorObject.errorsMap).length;

		return errorObject;
	}


	/**
	 *
	 * @param offer
	 * @returns {{errorsMap: {}, isValid: boolean}}
	 */
	static validateCreateOfferRequest(personal, descriptionObj) {
		const errorObject = {errorsMap: {}, isValid: true};

		console.log(descriptionObj);
		const {
			isFlat,
			floor,
			totalFloorNumber,
			totalRoomNumber,
			description,
			squareTotal,
		} = descriptionObj

		const {
			additionalPhoneNumber,
			pricePerMonth,
		} = personal


		if (isFlat) {
			if (!validator.isNumeric(floor) || totalFloorNumber < 1 || floor - totalFloorNumber > 0) {
				errorObject.errorsMap.floor = 'Невелидное значения этажа';
			}

			if (!validator.isNumeric(totalFloorNumber) || floor < 1 || floor - totalFloorNumber > 0) {
				errorObject.errorsMap.totalFloorNumber = 'Невелидное значения этажности';
			}
		}

		if (!validator.isNumeric(squareTotal) || squareTotal < 1) {
			errorObject.errorsMap.squareTotal = 'Площадь должна быть больше 1';
		}

		if (!validator.isNumeric(totalRoomNumber) || totalRoomNumber < 1) {
			errorObject.errorsMap.totalRoomNumber = 'Кол-во комнат должна быть больше 1';
		}

		if (!validator.isNumeric(pricePerMonth) || pricePerMonth < 1) {
			errorObject.errorsMap.pricePerMonth = 'Цена в месяц должна быть больше 1';
		}

		if (description > 2000) {
			errorObject.errorsMap.description = 'Описание не должно быть больше 2000 символов';
		}

		if (!validator.isEmpty(additionalPhoneNumber) && !validator.isMobilePhone(additionalPhoneNumber)) {
			errorObject.errorsMap.additionalPhoneNumber = 'Это не телефон!';
		}

		errorObject.isValid = !Object.keys(errorObject.errorsMap).length;

		return errorObject;
	}

}

export default ValidationHelper;
