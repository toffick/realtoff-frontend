import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PhotoUploader from '../../components/PhotoUploader';
import Loading from '../../components/Loading';

import Actions from '../../actions';
import {
	Carousel,
	Badge,
	Card,
	Image,
} from 'react-bootstrap';

import Stub from '../../components/Stub';
import OfferMap from '../../components/Maps/Offer';
import PermitsMaskHelper from '../../helpers/PermitsMaskHelper';

// TODO super fixes
// restyling
// split to several components
// PropTypes
// koko
// ability to change and uploading only for owner
// close ad
// change description
// change main photo

class Offer extends React.Component {

	_isAuthUserOwner() {
		const { user, offer } = this.props;

		if (!user || !offer) {
			return false;
		}

		const { user_id: ownerId } = offer;

		return user.id === ownerId;
	}


	componentDidMount() {
		const { params } = this.props.match;
		this.props.getOfferRequest(params.offerId);
	}

	getTitleByAddress = () => {
		const { city, street, house_number: houseNumber } = this.props.offer.Address;
		const cityFromCapital = city.charAt(0).toUpperCase() + city.slice(1);
		return `${cityFromCapital}, ${street} ${houseNumber}`;
	}

	onSelectPhotosHandler = (pictures) => {
		this.props.uploadPhotos(pictures);
	}

	getCarouselItems = () => {
		const { photos } = this.props.offer;

		return (
			<Carousel interval={100000000} defaultActiveindex={photos.length - 1}>
				{
					photos.map((photoItem) => (
						<Carousel.Item active>
							<Image className="inner" src={`${__BASE_URL__}${photoItem.destination}`} fluid />
						</Carousel.Item>
					))
				}
				{
					this._isAuthUserOwner() ?
						<Carousel.Item>
							<div className="inner">
								<PhotoUploader onSelectPhotos={this.onSelectPhotosHandler} />
							</div>
						</Carousel.Item>
						:
						null
				}


			</Carousel>
		);
	}


	render() {
		const { offer, isRequestInProgress } = this.props;

		if (isRequestInProgress) {
			return <Loading />;
		}

		if (!offer) {
			return <Stub />;
		}

		const {
			Address: address,
			Description: description,
			User: user,
			price_per_month: pricePerMonth,
			currency,
			additional_phone_number: additionalPhoneNumber,
			updated_at: updatedAt,
		} = offer;

		const {
			floor_number: floorNumber,
			floor_total: floorTotal,
			room_total: roomTotal,
			description: descriptionText,
			permits_mask: permitsMask,
			square_total: squareTotal,
		} = description;

		const { coordinates } = address;

		const { first_name: userName, is_personal_lessor: isPersonalLessor, telephone_number: generalPhone } = user;

		const permits = PermitsMaskHelper.getPermitsByMask(permitsMask);

		return (
			<div className="offer-page">
				<div className="images-wrapper">
					{this.getCarouselItems()}
				</div>
				<div className="description-wrapper">
					<Card className="description">
						<div>
							<h5 className="title">
								<Badge variant="dark" style={{ padding: '7px' }}>{pricePerMonth} {currency}/мес.</Badge>
								<span> {roomTotal} комнатная квартира</span>
							</h5>
							<h3 className="address">
								{this.getTitleByAddress()}
							</h3>

							<div className="text-right">
								<div>Этажность {floorNumber}/{floorTotal}</div>
								<div>Общая площадь {squareTotal} м²</div>
							</div>
							<div>
								{
									permits.length ?
										(
											<div>Особые условия
												{
													permits.map((item) =>
														(
															<div className="filter-modal-row ability-row">
																<div>{item.label}</div>
																<b>+</b>
															</div>
														))
												}
											</div>
										)
										: null
								}
							</div>
							<br />
							<p className="text">{descriptionText}</p>
						</div>
					</Card>

					<div>
						<div className="contacts text-right">
							<div className="updated"><Badge variant="light">Обновлено {updatedAt}</Badge></div>
							<div>
								<div>
									<b>Контакты</b>
									<div>{userName} ({isPersonalLessor ? 'Собственник' : 'Агенство'})</div>
									<div>{generalPhone}</div>
									{
										additionalPhoneNumber ?
											<div>{additionalPhoneNumber}</div>
											:
											null
									}
								</div>
							</div>

						</div>
						<div className="map">
							<OfferMap coordinates={coordinates.coordinates} width="490px" heigth="290px" />
						</div>
					</div>
				</div>
			</div>
		);
	}

}

Offer.propTypes = {};

Offer.defaultProps = {};

export default connect(
	(state) => ({
		user: state.auth.get('user'),
		offer: state.offerPage.get('offer'),
		isRequestInProgress: state.offerPage.get('isRequestInProgress'),
	}),
	(dispatch) => ({
		getOfferRequest: (id) => dispatch(Actions.offerPage.getOfferRequest(id)),
		uploadPhotos: (photos) => dispatch(Actions.offerPage.uploadPhotos(photos)),
	}),
)(Offer);
