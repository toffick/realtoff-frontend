import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Modal,
	Button,
} from 'react-bootstrap';

import Actions from '../../actions';
import NormalizedHelper from '../../helpers/NormalizeHelper';
import PermitsMaskHelper from '../../helpers/PermitsMaskHelper';
import { REALTY_TYPES } from '../../constants/OfferConstants';
import ErrorMessage from '../../components/ErrorMessage';

class FilterModalContainer extends React.Component {

	handleClose = () => {
		this.props.changeFilterShowStatus(false);
	}

	handleSubmit = () => {
		this.props.saveSearchFilterRequest();
	}

	getBody = () => {
		const { searchForm, location } = this.props;
		const normalizedForm = NormalizedHelper.removeEmptyValuesFields(searchForm);

		const {
			roomTotal,
			currency,
			permitsMask,
			type,
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
		} = normalizedForm;

		const createSimpleRow = (text, value, symbol) => (value ?
			(
				<div className="filter-modal-row">
					<span>{text}</span>
					<span>{value} {symbol}</span>
				</div>
			) : null);

		const permits = PermitsMaskHelper.getPermitsByMask(permitsMask);

		// TODO
		const address = location ? `${location.address.country}, ${location.address.city}` : '';

		return (
			<React.Fragment>
				{createSimpleRow('Адрес', address)}
				{createSimpleRow('Тип недвижимости', type === REALTY_TYPES.FLAT ? 'Квартира' : 'Дом')}
				{createSimpleRow('Количество комнат', roomTotal)}
				{createSimpleRow('Цена от', priceFrom, currency)}
				{createSimpleRow('Цена до', priceTo, currency)}
				{createSimpleRow('Площадь от', squareFrom, 'м²')}
				{createSimpleRow('Площадь до', squareTo, 'м²')}
				{
					permits.length ?
						(
							<div><b>Особые условия</b>
								{
									permits.map((item) =>
										(
											<div className="filter-modal-row ability-row">
												<div>{item.label}</div><b>+</b>
											</div>
										))
								}
							</div>
						)
						: null
				}
			</React.Fragment>
		);
	}

	render() {
		const {
			isShow,
			error,
			processStatus
		} = this.props;

		return (
			<React.Fragment>
				<Modal show={isShow} centered onHide={this.handleClose}>
					<Modal.Header cseButton>
						<Modal.Title>
							Сохраните поисковые настройки для оповещений
							<p>
								<small>
									Как только появится предложение, соответствующее Вашим сохраненным настройкам,
									мы отправим Вам письмо.
								</small>
							</p>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{error ? <ErrorMessage error={error} /> : null}
						{this.getBody()}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Отмена
						</Button>
						<Button variant="primary" onClick={this.handleSubmit} disabled={processStatus}>
							Сохранить
						</Button>
					</Modal.Footer>
				</Modal>

			</React.Fragment>
		);
	}

}

FilterModalContainer.propTypes = {
	availableCountries: PropTypes.array,
	isShow: PropTypes.bool,
	processStatus: PropTypes.bool,
	error: PropTypes.object,
	location: PropTypes.object.isRequired,
	searchForm: PropTypes.object.isRequired,
	changeFilterShowStatus: PropTypes.func.isRequired,
	saveSearchFilterRequest: PropTypes.func.isRequired,
};

FilterModalContainer.defaultProps = {
	availableCountries: [],
	isShow: false,
	error: null,
	processStatus: false,
};

export default connect(
	(state) => ({
		error: state.filter.get('error'),
		isShow: state.filter.get('isShow'),
		searchForm: state.search.get('form'),
		location: state.search.get('location'),
		processStatus: state.search.get('processStatus'),
	}),
	(dispatch) => ({
		saveSearchFilterRequest: () => dispatch(Actions.search.saveSearchFilterRequest()),
		changeFilterShowStatus: (status) => {
			dispatch(Actions.filter.changeShowStatus(status))
			dispatch(Actions.filter.setError(null))
		},
	}),
)(FilterModalContainer);
