import validator from 'validator';

class ValidationHelper {

	/**
	 *
	 * @param form
	 * @returns {{errorsMap: {}, isValid: boolean}}
	 */
	static validateOfferSearchRequest(form) {
		const errorObject = { errorsMap: {}, isValid: true };
		const {
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
			roomTotal,
		} = form;

		if (roomTotal.length) {
			if (!validator.isNumeric(roomTotal)) {
				errorObject.errorsMap.roomTotal = 'Room count should be a number';
			} else if (Number(roomTotal) < 1) {
				errorObject.errorsMap.roomTotal = 'Room count should be greater than 1';
			}
		}

		if (priceFrom.length) {
			if (!validator.isNumeric(priceFrom)) {
				errorObject.errorsMap.priceFrom = 'Price from should be a number';
			} else if (Number(priceFrom) < 0) {
				errorObject.errorsMap.priceFrom = 'Price from should be greater than 0';
			}
		}

		if (priceTo.length) {
			if (!validator.isNumeric(priceTo)) {
				errorObject.errorsMap.priceTo = 'Price to should be a number';
			} else if (Number(priceTo) < 0) {
				errorObject.errorsMap.priceTo = 'Price to should be greater than 0';
			} else if (validator.isNumeric(priceFrom) && Number(priceFrom) > Number(priceTo)) {
				errorObject.errorsMap.priceTo = 'Price to should be greater than price from';
			}
		}


		if (squareFrom.length) {
			if (!validator.isNumeric(squareFrom)) {
				errorObject.errorsMap.squareFrom = 'Price from should be a number';
			} else if (Number(squareFrom) < 0) {
				errorObject.errorsMap.squareFrom = 'Price from should be greater than 0';
			}
		}

		if (squareTo.length) {
			if (!validator.isNumeric(squareTo)) {
				errorObject.errorsMap.squareTo = 'Square to should be a number';
			} else if (Number(priceFrom < 0)) {
				errorObject.errorsMap.squareTo = 'Square to should be greater than 0';
			} else if (validator.isNumeric(squareFrom) && Number(squareFrom) > Number(squareTo)) {
				errorObject.errorsMap.squareTo = 'Square to should be greater than square from';
			}
		}

		errorObject.isValid = !Object.keys(errorObject.errorsMap).length;

		return errorObject;
	}

}

export default ValidationHelper;
