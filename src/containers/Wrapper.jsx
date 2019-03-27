import React from 'react';
import PropTypes from 'prop-types';

import Toast from '../components/Toast';

class Wrapper extends React.Component {

	render() {
		const { children } = this.props;

		return (
			<div>
				{children}
				<Toast />
			</div>
		);
	}

}

Wrapper.propTypes = {
	children: PropTypes.any.isRequired,
};

export default Wrapper;
