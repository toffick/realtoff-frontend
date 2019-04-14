/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import timeAgo from 'time-ago';

class OfferPreview extends Component {

	getTitleByAddress = () => {
		const { city, street, house_number: houseNumber } = this.props.offer;
		const cityFromCapital = city.charAt(0).toUpperCase() + city.slice(1);
		return `${cityFromCapital}, ${street} ${houseNumber}`;
	}

	render() {
		const { offer, isActive } = this.props;

		const {
			previewImg, currency, price_per_month: pricePerMonth, description,
		} = offer;
		const slicedDescription = `${description.slice(0, 80)}...`;

		return (
			<Card className="card-wrapper">
				<Card.Img variant="top" src={previewImg} className="preview-img" />
				<Card.Body className={`main ${isActive ? 'selected-placemark' : ''}`}>
					<Card.Title>
						<div className="title">
							<div>{this.getTitleByAddress()} {isActive}</div>
							<div>{pricePerMonth} {currency} / month</div>
						</div>

					</Card.Title>
					<Card.Text>
						{slicedDescription}
					</Card.Text>
				</Card.Body>
				<Card.Footer className="created-at">
					<small className="text-muted">Created {timeAgo.ago(new Date(offer.created_at))}</small>
				</Card.Footer>
			</Card>

		);
	}

}

OfferPreview.propTypes = {
	offer: PropTypes.object,
	isActive: PropTypes.bool,
};

OfferPreview.defaultProps = {
	offer: {},
	isActive: false,
};

export default OfferPreview;
