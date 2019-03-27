import { push, replace, goBack } from 'react-router-redux';

export default {
	navigateTo: (path, options) => (options && options.replace ? replace(path) : push(path)),
	goBack: () => goBack(),
};
