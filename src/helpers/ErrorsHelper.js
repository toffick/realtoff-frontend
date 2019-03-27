class ErrorsHelper {

	/**
	 *
	 * @param {Object} err
	 * @return {Array}
	 */
	static processServerErrors(err) {

		let errors = [];

		if (err.response && err.response.data && err.response.data.errors) {
			const { errors: responseErrors } = err.response.data;
			errors = responseErrors;
		} else if (err.message) {
			errors = [{ param: null, message: err.message }];
		} else {
			errors = [{ param: null, message: 'Unknown Error' }];
		}

		return errors;

	}

}

export default ErrorsHelper;
