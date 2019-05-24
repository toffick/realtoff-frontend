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
			destination: previewImg, currency, price_per_month: pricePerMonth, description, room_total: roomTotal, type,
		} = offer;
		const slicedDescription = description.length > 80 ? `${description.slice(0, 80)}...` : description;
		const imageSrc = previewImg ? `${__BASE_URL__}${previewImg}` : `${__BASE_URL__}/import/no_photo.jpg`;

		const roomDescr = NormalizeHelper.getNumberStringSuffix(roomTotal, type);

		return (
			<Card className="card-wrapper">
				<Card.Img
					variant="top"
					src={imageSrc}
					className="preview-img"
				/>
				<Card.Body  className={isActive && 'selected-placemark'}>
					<Card.Title>
						<div className="title">
							<div>{roomDescr}</div>
							<div><b>{pricePerMonth} {currency}</b> / месяц</div>
						</div>
						<div><h4><b>{NormalizeHelper.getAddressTitle(this.props.offer)} {isActive}</b></h4></div>
					</Card.Title>
					<Card.Text>
						{slicedDescription ||  (<br/>)}
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Создано {moment(offer.created_at).locale('ru').format('LL')}</small>
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
