import React from 'react';
import {
	Badge,
	Card,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import { ROUTER_PATHS } from '../../constants/GlobalConstants';
import { OFFER_STATUS } from '../../constants/OfferConstants';
import NormalizeHelper from '../../helpers/NormalizeHelper';
import { getOfferStatusBadge } from '../../utils/Offer';

class OfferList extends React.Component {


	render() {
		const { offers } = this.props;

		return (
			<div className="own-offers-wrapper">
				Мои объявления
				<div className="list">
					{
						offers.map((offer) => {

							const {
								currency, price_per_month: pricePerMonth, Address: address, id, created_at: createdAt, status,
							} = offer;

							return (
								<NavLink to={`${ROUTER_PATHS.OFFERS}/${id}`} className="offer-link">
									<div className="offer-card">
										<Card>
											<Card.Body>
												<Card.Text className="">
													<span>{NormalizeHelper.getAddressTitle(address)}</span>
													<div>{pricePerMonth} {currency} / месяц</div>
												</Card.Text>
											</Card.Body>
											<Card.Footer className="d-sm-flex justify-content-between">
												<small
													className="text-muted"
												>Создано {moment(offer.created_at).locale('ru').format('LL')}
												</small>
												{getOfferStatusBadge(status)}
											</Card.Footer>
										</Card>
									</div>
								</NavLink>
							);
						})
					}
				</div>
			</div>
		);
	}

}

export default OfferList;
