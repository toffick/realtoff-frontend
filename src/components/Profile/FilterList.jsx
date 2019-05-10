import React from 'react';
import iso3166 from 'iso-3166-1-alpha-2';
import {
	Button,
	Card,
	Modal,
} from 'react-bootstrap';
import moment from 'moment';

import UserFilterPreview from '../UserFilterPreview';

class FilterList extends React.Component {

	state = {
		modalShow: false,
		deletedFilterId: null,
	}

	onDeleteFilterHandler = (filterId) => {
		this.setState({
			modalShow: true,
			deletedFilterId: filterId,
		});
	}

	resetDeleteModal = () => {
		this.setState({
			modalShow: false,
			deletedFilterId: null,
		});
	}

	onDeleteConfirm = () => {
		this.props.onDeleteFilter(this.state.deletedFilterId);
		this.resetDeleteModal();
	}

	render() {
		const { filters } = this.props;

		return (
			<div className="user-filter-wrapper">
				{
					filters.map((filter) => {
						const {
							country_code: countryCode,
							city,
							type,
							price_from: priceFrom,
							price_to: priceTo,
							currency,
							permits_mask: permitsMask,
							room_total: roomTotal,
							square_from: squareFrom,
							square_to: squareTo,
						} = filter;

						const address = {
							country: iso3166.getCountry(countryCode),
							city,
						};

						const form = {
							type,
							priceFrom,
							priceTo,
							currency,
							permitsMask,
							roomTotal,
							squareFrom,
							squareTo,
						};

						return (
							<React.Fragment>
								<Modal show={this.state.modalShow} centered onHide={this.handleClose}>
									<Modal.Header cseButton>
										<Modal.Title>
											Вы уверены, что хотите удалить данный фильтр?
											<p>
												<small>
													Вы больше не сможете получить уведомления, которые соответствуют его
													параметрам
												</small>
											</p>
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Button variant="secondary" onClick={this.resetDeleteModal}>
											Отмена
										</Button>
										<Button variant="danger" onClick={this.onDeleteConfirm}>
											Удалить
										</Button>
									</Modal.Body>
								</Modal>
								<Card className="user-filter">
									<Card.Title className="header-filter">
										<small>Создано {moment(filter.created_at).locale('ru').format('LL')}</small>
										<Button
											onClick={this.onDeleteFilterHandler.bind(this, filter.id)}
										>Удалить
										</Button>
									</Card.Title>
									<hr />
									<Card.Body>
										<UserFilterPreview location={address} form={form} />
									</Card.Body>
								</Card>
							</React.Fragment>
						);
					})
				}
			</div>
		);
	}

}

export default FilterList;
