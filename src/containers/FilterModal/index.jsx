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
import UserFilterPreview from '../../components/UserFilterPreview';

class FilterModalContainer extends React.Component {

	handleClose = () => {
		this.props.changeFilterShowStatus(false);
	}

	handleSubmit = () => {
		this.props.saveSearchFilterRequest();
	}

	render() {
		const {
			isShow,
			error,
			processStatus,
			location,
			searchForm,
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
						<UserFilterPreview location={location && location.address} form={searchForm} />
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
			dispatch(Actions.filter.changeShowStatus(status));
			dispatch(Actions.filter.setError(null));
		},
	}),
)(FilterModalContainer);
