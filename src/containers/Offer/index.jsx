import React from 'react';
import { connect } from 'react-redux';
import Image from 'react-image-resizer';
import {
	Carousel,
	Badge,
	Card,
	Button,
} from 'react-bootstrap';
import moment from 'moment';

import PhotoUploader from '../../components/PhotoUploader';
import Loading from '../../components/Loading';
import Stub from '../../components/Stub';
import OfferMap from '../../components/Maps/Offer';
import AdminOfferPanel from '../../components/Offer/AdminPanel';

import Actions from '../../actions';
import PermitsMaskHelper from '../../helpers/PermitsMaskHelper';
import { getOfferStatusBadge } from '../../utils/Offer';
import { OFFER_STATUS } from '../../constants/OfferConstants';
import { USER_ROLES } from '../../constants/GlobalConstants';

// TODO super fixes
// restyling
// split to several components
// PropTypes
// koko
// ability to change and uploading only for owner
// change description
// change main photo

class Offer extends React.Component {

	_isAuthUserAdmin() {
		const {user} = this.props;

		return user && user.role === USER_ROLES.ADMIN;
	}

	_isAuthUserOwner() {
		const {user, offer} = this.props;

		if (!user || !offer) {
			return false;
		}

		const {user_id: ownerId} = offer;

		return user.id === ownerId;
	}


	componentDidMount() {
		const {params} = this.props.match;
		this.props.getOfferRequest(params.offerId);
	}

	getTitleByAddress = () => {
		const {city, street, house_number: houseNumber} = this.props.offer.Address;
		const cityFromCapital = city.charAt(0).toUpperCase() + city.slice(1);
		return `${cityFromCapital}, ${street} ${houseNumber}`;
	}

	onSelectPhotosHandler = (pictures) => {
		this.props.uploadPhotos(pictures);
	}

	onCloseOfferHandler = () => {
		this.props.closeOfferRequest();
	}

	onOfferStatusChangeHandler = (newStatus) => {
		const {id} = this.props.offer;

		this.props.changeOfferStatus(id, newStatus);
	}

	onUserStatusChangeHandler = (newStatus) => {
		const {User: {id}} = this.props.offer;

		this.props.changeUserStatus(id, newStatus);
	}

	onPhotoDeleteHandler = (photoId) => {
		this.props.deletePhoto(photoId);
	}

	getCarouselItems = () => {
		const {photos, status} = this.props.offer;


		const photosView = (this._isAuthUserOwner() && status === OFFER_STATUS.OPEN) || photos.length ?
			(<Carousel interval={100000000} defaultActiveindex={photos.length - 1}>
				{
					photos.map((photoItem) => (
						<Carousel.Item active>
							<div
								style={{marginBottom: '10px', textAlign: 'center'}}
							>
								{this._isAuthUserOwner() ?

									<Button
										onClick={() => this.onPhotoDeleteHandler(photoItem.id)}
									>
										Удалить фото
									</Button>
									:
									null
								}
							</div>
							<Image
								src={`${__BASE_URL__}${photoItem.destination}`}
								height={650}
								width={1070}
							/>
						</Carousel.Item>
					))
				}
				{
					this._isAuthUserOwner() && status === OFFER_STATUS.OPEN ?
						<Carousel.Item>
							<div className="item">
								<PhotoUploader onSelectPhotos={this.onSelectPhotosHandler} style={{margin: '0'}}/>
							</div>
						</Carousel.Item>
						:
						null
				}
			</Carousel>)
			:
			(<div className="item placeholder"/>);


		return photosView;


	}


	render() {
		const {offer, isRequestInProgress} = this.props;

		if (isRequestInProgress) {
			return <Loading/>;
		}

		if (!offer) {
			return <Stub/>;
		}

		const {
			Address: address,
			Description: description,
			User: user,
			price_per_month: pricePerMonth,
			currency,
			additional_phone_number: additionalPhoneNumber,
			updated_at: updatedAt,
			status,
		} = offer;

		const {
			floor_number: floorNumber,
			floor_total: floorTotal,
			room_total: roomTotal,
			description: descriptionText,
			permits_mask: permitsMask,
			square_total: squareTotal,
		} = description;

		const {coordinates} = address;

		const {first_name: userName, is_personal_lessor: isPersonalLessor, telephone_number: generalPhone} = user;

		const permits = PermitsMaskHelper.getPermitsByMask(permitsMask);

		return (
			<div className="offer-page">
				{
					this._isAuthUserOwner() ?
						<div className="owner-panel">

							<Button
								variant="danger"
								onClick={this.onCloseOfferHandler}
								disabled={status !== OFFER_STATUS.OPEN}
							>
								Закрыть предложение
							</Button>

						</div>
						:
						this._isAuthUserAdmin() ?
							<AdminOfferPanel
								offer={offer}
								onChangeOfferStatus={this.onOfferStatusChangeHandler}
								onChangeUserStatus={this.onUserStatusChangeHandler}
							/>
							:
							null
				}
				<div className="images-wrapper">
					{this.getCarouselItems()}
				</div>
				<div className="description-wrapper">
					<Card className="description">
						<div>
							<h5 className="title">
								<Badge variant="dark" style={{padding: '7px'}}>{pricePerMonth} {currency}/мес.</Badge>
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
																<b>✓</b>
															</div>
														))
												}
											</div>
										)
										: null
								}
							</div>
							<br/>
							<p className="text">{descriptionText}</p>
						</div>
					</Card>

					<div>
						<div className="contacts text-right">
							<div className="updated"><Badge
								variant="light"
							>Обновлено {moment(updatedAt).locale('ru').format('LL')}
							</Badge> {getOfferStatusBadge(status)}
							</div>
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
							<OfferMap coordinates={coordinates.coordinates} width="490px" heigth="290px"/>
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
		closeOfferRequest: () => dispatch(Actions.offerPage.closeOfferRequest()),
		deletePhoto: (photoId) => dispatch(Actions.offerPage.deletePhoto(photoId)),
		changeOfferStatus: (offerId, status) => dispatch(Actions.admin.changeOfferStatus(offerId, status)),
		changeUserStatus: (userId, status) => dispatch(Actions.admin.changeUserStatus(userId, status))
	}),
)(Offer);
