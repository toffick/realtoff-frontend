export const CREATE_OFFER_STEPS = {
	LOCATION: {id: 'LOCATION', title: 'Месторасположение'},
	DETAILS: {id: 'DETAILS', title: 'Детали и описание'},
	PERSONAL: {id: 'PERSONAL', title: 'Контакты и оплата'},
};

export const REALTY_TYPES = {
	HOUSE: 'house',
	FLAT: 'flat',
};

export const RENT_PERMITS = {
	SMOKE: {flag: 1, label: 'Курение не запрещено'},
	STUDENTS: {flag: 2, label: 'Для студентов'},
	CHILDREN: {flag: 4, label: 'Проживание с детьми'},
	PETS: {flag: 8, label: 'Проживание с животными'},
	PARKING: {flag: 16, label: 'Парковочное место'},
	WITHOUT_PREPAYMENT: {flag: 32, label: 'Без предоплаты'},

};

export const CURRENCY_TYPES = {
	BYN: 'BYN',
	USD: 'USD',
};

export const OFFER_STATUS = {
	OPEN: 'OPEN',
	CLOSED: 'CLOSED',
	BANNED: 'BANNED',
}
