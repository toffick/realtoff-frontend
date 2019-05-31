import validator from 'validator';

class ValidationHelper {

	/**
	 *
	 * @param form
	 * @returns {{errorsMap: {}, isValid: boolean}}
	 */
	static validateOfferSearchRequest(form) {
		const validateResult = { errorsMap: {}, isValid: true };
		const {
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
			roomTotal,
		} = form;

		if (roomTotal.length) {
			if (!validator.isNumeric(roomTotal)) {
				validateResult.errorsMap.roomTotal = 'Комнаты должны быть числом';
			} else if (Number(roomTotal) < 1) {
				validateResult.errorsMap.roomTotal = 'Комнат не может быть меньше 1';
			}
		}

		if (priceFrom.length) {
			if (!validator.isNumeric(priceFrom)) {
				validateResult.errorsMap.priceFrom = 'Цена(от) должна быть числом';
			} else if (Number(priceFrom) < 0) {
				validateResult.errorsMap.priceFrom = 'Цена(от) должна не может быть меньше 0';
			}
		}

		if (priceTo.length) {
			if (!validator.isNumeric(priceTo)) {
				validateResult.errorsMap.priceTo = 'Цена(до) должна быть числом';
			} else if (Number(priceTo) < 0) {
				validateResult.errorsMap.priceTo = 'Цена(до) должна быть больше 0';
			} else if (validator.isNumeric(priceFrom) && Number(priceFrom) > Number(priceTo)) {
				validateResult.errorsMap.priceTo = 'Цена(от) должна быть меньше цены(до)';
			}
		}


		if (squareFrom.length) {
			if (!validator.isNumeric(squareFrom)) {
				validateResult.errorsMap.squareFrom = 'Площадь(от) должна быть числом';
			} else if (Number(squareFrom) < 0) {
				validateResult.errorsMap.squareFrom = 'Площадь(до) должна быть больше 0';
			}
		}

		if (squareTo.length) {
			if (!validator.isNumeric(squareTo)) {
				validateResult.errorsMap.squareTo = 'Площадь(до) должна быть числом';
			} else if (Number(priceFrom < 0)) {
				validateResult.errorsMap.squareTo = 'Площадь(до) должна быть больше 0';
			} else if (validator.isNumeric(squareFrom) && Number(squareFrom) > Number(squareTo)) {
				validateResult.errorsMap.squareTo = 'Площадь(от) должна быть больше площади(до)';
			}
		}

		validateResult.isValid = !Object.keys(validateResult.errorsMap).length;

		return validateResult;
	}


	/**
	 *
	 * @param offer
	 * @returns {{errorsMap: {}, isValid: boolean}}
	 */
	static validateCreateOfferRequest(personal, descriptionObj) {
		const validateResult = { errorsMap: {}, isValid: true };

		const {
			isFlat,
			floor,
			totalFloorNumber,
			totalRoomNumber,
			description,
			squareTotal,
		} = descriptionObj;

		const {
			additionalPhoneNumber,
			pricePerMonth,
		} = personal;


		if (isFlat) {
			if (!validator.isNumeric(floor) || totalFloorNumber < 1 || floor - totalFloorNumber > 0) {
				validateResult.errorsMap.floor = 'Невелидное значения этажа';
			}

			if (!validator.isNumeric(totalFloorNumber) || floor < 1 || floor - totalFloorNumber > 0) {
				validateResult.errorsMap.totalFloorNumber = 'Невелидное значения этажности';
			}
		}

		if (!validator.isNumeric(squareTotal) || squareTotal < 1) {
			validateResult.errorsMap.squareTotal = 'Площадь должна быть больше 1';
		}

		if (!validator.isNumeric(totalRoomNumber) || totalRoomNumber < 1) {
			validateResult.errorsMap.totalRoomNumber = 'Кол-во комнат должна быть больше 1';
		}

		if (!validator.isNumeric(pricePerMonth) || pricePerMonth < 1) {
			validateResult.errorsMap.pricePerMonth = 'Цена в месяц должна быть больше 1';
		}

		if (description.length > 2000) {
			validateResult.errorsMap.description = 'Описание не должно быть больше 2000 символов';
		}

		if (!validator.isEmpty(additionalPhoneNumber) && !validator.isMobilePhone(additionalPhoneNumber)) {
			validateResult.errorsMap.additionalPhoneNumber = 'Неверный формат номера';
		}

		validateResult.isValid = !Object.keys(validateResult.errorsMap).length;

		return validateResult;
	}

	/**
	 *
	 * @returns {{errorsMap: {}, isValid: boolean}}
	 * @param newFirstName
	 * @param newPhoneNumber
	 */
	static validateChangeProfile(newFirstName, newPhoneNumber) {

		const validateResult = { errorsMap: {}, isValid: true };

		if (!newFirstName || validator.isEmpty(newFirstName)) {
			validateResult.errorsMap.newFirstName = 'Имя не может быть пустым';
		} else if (newFirstName.length > 255) {
			validateResult.errorsMap.newFirstName = 'Длина привышает 255 символов';
		}

		if (!newPhoneNumber || validator.isEmpty(newPhoneNumber)) {
			validateResult.errorsMap.newPhoneNumber = 'Номер телефона обязателен';
		} else if (!validator.isMobilePhone(newPhoneNumber)) {
			validateResult.errorsMap.newPhoneNumber = 'Невалидный номер телефона';
		}
		validateResult.isValid = !Object.keys(validateResult.errorsMap).length;

		return validateResult;
	}

	/**
	 *
	 * @param email
	 * @param password
	 * @param passwordRepeat
	 * @returns {string|null}
	 */
	static validateSignUp(email, password, passwordRepeat) {

		if (validator.isEmpty(email)) {
			return 'Электронная почта обязательна';
		}

		if (!validator.isEmail(email, { allow_utf8_local_part: false })) {
			return 'Неверный формат электронной почты';
		} else if (email.length > 64) {
			return 'Электронная почта должна быть не больше 64 символов';
		}

		if (validator.isEmpty(password)) {
			return 'Пароль обязателен';
		}

		if (!validator.isLength(password, { min: 6 })) {
			return 'Пароль должен быть длинее 6 символов';
		}

		if (password !== passwordRepeat) {
			return 'Пароли не совпадают';
		}

		return null;
	}

	/**
	 *
	 * @param email
	 * @param password
	 * @returns {string|null}
	 */
	static validateSignIn(email, password) {
		if (validator.isEmpty(email)) {
			return 'Электронная почта обязательна';
		}

		if (!validator.isEmail(email, { allow_utf8_local_part: false })) {
			return 'Неверный формат электронной почты';
		} else if (email.length > 64) {
			return 'Электронная почта должна быть не больше 64 символов';
		}

		if (validator.isEmpty(password)) {
			return 'Пароль обязателен';
		}

		if (!validator.isLength(password, { min: 6 })) {
			return 'Пароль должен быть длинее 6 символов';
		}

		return null;
	}

	/**
	 *
	 * @param location
	 * @returns {boolean}
	 */
	static checkCreateOfferLocationNextAccess(location) {
		const {
			city, country_code, house_number, street,
		} = location.address;
		return city && country_code && house_number && street;
	}

	/**
	 *
	 * @returns {boolean}
	 * @param oldForm
	 * @param newValue
	 */
	static checkCreateOfferDetailsNextAccess(oldForm, newValue) { // sry, budes, but i should(
		const merge = { ...oldForm, ...newValue };
		const {
			floor, squareTotal, totalFloorNumber, totalRoomNumber,
		} = merge;
		return floor.length && squareTotal.length && totalFloorNumber.length && totalRoomNumber.length;
	}

}

export default ValidationHelper;
