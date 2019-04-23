/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import NormalizeHelper from '../../helpers/NormalizeHelper';

class OfferPreview extends Component {

	render() {
		const { offer, isActive } = this.props;

		const {
			destination: previewImg, currency, price_per_month: pricePerMonth, description,
		} = offer;
		const slicedDescription = `${description.slice(0, 80)}...`;
		const imageSrc = previewImg ? `${__BASE_URL__}${previewImg}` : null;

		return (
			<Card className="card-wrapper">
				<Card.Img
					variant="top"
					src={imageSrc}
					className="preview-img"
				/>
				<Card.Body className={`main ${isActive ? 'selected-placemark' : ''}`}>
					<Card.Title>
						<div className="title">
							<div>{NormalizeHelper.getAddressTitle(this.props.offer)} {isActive}</div>
							<div>{pricePerMonth} {currency} / месяц</div>
						</div>

					</Card.Title>
					<Card.Text>
						{slicedDescription}
					</Card.Text>
				</Card.Body>
				<Card.Footer className="created-at">
					<small className="text-muted">Создано {moment(offer.created_at).locale('ru').format('LL') }</small>
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
