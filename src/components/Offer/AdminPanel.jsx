import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { OFFER_STATUS } from '../../constants/OfferConstants';
import { USER_STATUS } from '../../constants/GlobalConstants';

class AdminOfferPanel extends Component {

	onOfferStatusChange = (status) => {
		this.props.onChangeOfferStatus(status);
	}


	getOfferStatusChangeButtons = () => {
		const { status } = this.props.offer;

		return (
			<div>
				<Button
					variant="danger"
					onClick={this.onOfferStatusChange.bind(this, OFFER_STATUS.OPEN)}
					disabled={status === OFFER_STATUS.OPEN}
				>
					Открыть
				</Button>
				<Button
					variant="danger"
					onClick={this.onOfferStatusChange.bind(this, OFFER_STATUS.CLOSED)}
					disabled={status === OFFER_STATUS.CLOSED}
				>
					Закрыть
				</Button>
				<Button
					variant="danger"
					onClick={this.onOfferStatusChange.bind(this, OFFER_STATUS.BANNED)}
					disabled={status === OFFER_STATUS.BANNED}
				>
					Забанить
				</Button>
			</div>
		);
	}

	render() {

		const { onChangeUserStatus, offer } = this.props;
		const { User: { status } } = offer;

		return (
			<div className="admin-panel">
				{this.getOfferStatusChangeButtons()}
				<div>
					<Button
						variant="danger"
						onClick={onChangeUserStatus.bind(this, USER_STATUS.BANNED)}
						disabled={status === USER_STATUS.BANNED}
					>
						Забанить автора
					</Button>
				</div>
			</div>
		);
	}

}

AdminOfferPanel.propTypes = {
	offer: PropTypes.object,
	onChangeOfferStatus: PropTypes.func.isRequired,
	onChangeUserStatus: PropTypes.func.isRequired,
};

AdminOfferPanel.defaultProps = {
	offer: {},
};

export default AdminOfferPanel;
