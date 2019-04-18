import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Offer extends React.Component {

	compon
	render() {

		return (
			<h1>OfferID {this.props.match.params.offerId}</h1>
		);
	}

}

Offer.propTypes = {};

Offer.defaultProps = {};

export default connect(
	(state) => ({}),
	(dispatch) => ({}),
)(Offer);
