import React from 'react';
import PropTypes from 'prop-types';

import NormalizedHelper from '../../helpers/NormalizeHelper';
import PermitsMaskHelper from '../../helpers/PermitsMaskHelper';
import { REALTY_TYPES } from '../../constants/OfferConstants';

class UserFilterPreview extends React.Component {

	render() {
		const { form, location } = this.props;
		const normalizedForm = NormalizedHelper.removeEmptyValuesFields(form);

		const {
			roomTotal,
			currency,
			permitsMask,
			type,
			priceFrom,
			priceTo,
			squareFrom,
			squareTo,
			isPersonalLessor,
		} = normalizedForm;

		const createSimpleRow = (text, value, symbol) => (value ?
			(
				<div className="filter-modal-row">
					<span>{text}</span>
					<span>{value} {symbol}</span>
				</div>
			) : null);

		const permits = PermitsMaskHelper.getPermitsByMask(permitsMask);

		const addressText = location ? `${location.country}, ${location.city}` : '';

		return (
			<React.Fragment>
				{createSimpleRow('Адрес', addressText)}
				{createSimpleRow('Тип недвижимости', type === REALTY_TYPES.FLAT ? 'Квартира' : 'Дом')}
				{createSimpleRow('Количество комнат', roomTotal)}
				{createSimpleRow('Только собственник', isPersonalLessor, '+')}
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
												<div>{item.label}</div>
												<b>+</b>
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

}

UserFilterPreview.propTypes = {
	location: PropTypes.shape({
		country: PropTypes.string,
		city: PropTypes.string,
	}),
	form: PropTypes.shape({
		roomTotal: PropTypes.number,
		currency: PropTypes.string,
		permitsMask: PropTypes.number,
		type: PropTypes.string,
		priceFrom: PropTypes.number,
		priceTo: PropTypes.number,
		squareFrom: PropTypes.number,
		squareTo: PropTypes.number,
		isPersonalLessor: PropTypes.bool,
	}),
};

UserFilterPreview.defaultProps = {
};

export default UserFilterPreview;
