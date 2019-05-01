import ToastWrapper from '../helpers/ToastHelper';

class ErrorsHelper {

	/**
	 *
	 * @param {Object} err
	 * @return {Array}
	 */
	static processServerErrors(err) {

		const bannedStatus = 'banned';
		let errors = [];

		if (err.response && err.response.data && err.response.data.errors) {
			const { errors: responseErrors } = err.response.data;
			errors = responseErrors;
			if (responseErrors.find(({ param }) => param === bannedStatus)) {
				ToastWrapper.error('Пользователь заблокирован. По всем вопросам обращайтесь realtoffinfo@gmail.com', false);
				errors[0].isBanned = true; //sry
			}

		} else if (err.message) {
			errors = [{ param: null, message: err.message }];
		} else {
			errors = [{ param: null, message: 'Unknown Error' }];
		}

		return errors;

	}

}

export default ErrorsHelper;
