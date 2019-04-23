import React from 'react';
import { Badge } from 'react-bootstrap';

import { OFFER_STATUS } from '../constants/OfferConstants';

	export const getOfferStatusBadge = (status) => {
		switch (status) {
			case OFFER_STATUS.OPEN:
				return <Badge variant="success">Открыто</Badge>;
			case OFFER_STATUS.CLOSED:
				return <Badge variant="warning">Закрыто</Badge>;
			case OFFER_STATUS.BANNED:
				return <Badge variant="danger">Забанено</Badge>;
	}
};
