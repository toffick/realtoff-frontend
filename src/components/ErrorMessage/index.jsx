import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage(props) {
	const { error } = props;
//TODO doesnt work
	return (
		<div className="form__error-wrapper js-form__err-animation">
			<p className="form__error">
				{error}
			</p>
		</div>
	);
}

ErrorMessage.propTypes = {
	error: PropTypes.string.isRequired,
};

export default ErrorMessage;
