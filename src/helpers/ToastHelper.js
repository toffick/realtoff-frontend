import { toast } from 'react-toastify';

class ToastWrapper {

	static warn(message, autoClose = 3000) {
		toast.warn(JSON.stringify(message), {
			position: toast.POSITION.TOP_RIGHT,
			autoClose,
			hideProgressBar: false,
		});
	}

	static error(message, autoClose = 3000) {
		toast.error(JSON.stringify(message), {
			position: toast.POSITION.TOP_RIGHT,
			autoClose,
			hideProgressBar: false,
		});
	}

	static success(message, autoClose = 3000) {
		toast.success(JSON.stringify(message), {
			position: toast.POSITION.TOP_RIGHT,
			autoClose,
			hideProgressBar: false,
		});
	}

}

export default ToastWrapper;
