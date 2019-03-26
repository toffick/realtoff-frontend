/* eslint-disable no-underscore-dangle */
/* eslint valid-typeof:0 */
import _ from 'lodash';
import GridReducer from '../reducers/GridReducer';
import BaseActionsClass from './BaseActionsClass';

const FIELDS = {
	DEFAULT: {
		data: (data) => data.result.items,
		totalDataSize: (data) => data.result.count,
	},
	ALLOWED: [{
		name: 'data',
		type: 'function',
		returnType: (type) => type instanceof Array,
	}, {
		name: 'totalDataSize',
		type: 'function',
		returnType: (type) => typeof type === 'number',
	}],
};

export class GridActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GridReducer);
	}

	clearTimeout(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			const loadingTimeout = state.grid.getIn([gridName, 'loadingTimeout']);
			clearTimeout(loadingTimeout);
			dispatch(this.setValue([gridName, 'loadingTimeout'], null));
		};
	}

	/**
	 * Get data
	 * @param {String} gridName
	 * @param {Function} func
	 * @param {Object|null} fields define data and size
	 * @param {Function?} fields.data info for table page
	 * @param {Function} fields.totalDataSize total size info in data
	 * @returns {function(*=): Promise<any>}
	 */
	getData(gridName, func, fields = null) {
		if (!(typeof fields === 'object')) throw new Error('must be an object');

		fields = fields ? _.merge(_.cloneDeep(FIELDS.DEFAULT), fields) : _.cloneDeep(FIELDS.DEFAULT);
		return (dispatch) => new Promise((resolve, reject) => {
			dispatch(this._loadingMiddleware(gridName, func)).then((data) => {
				FIELDS.ALLOWED.forEach(({ name, type, returnType }) => {
					if (!(name in fields)) throw new Error(`must be a field ${name} `);
					if (typeof fields[name] !== type) throw new Error(`must be a field with a ${type}`);
					if (!returnType(fields[name](data))) throw new Error(`must be correct return type for field ${name}`);
					dispatch(this.setValue([gridName, name], fields[name](data)));
				});
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}


	/**
	 * Set total data size
	 * @param {String} gridName
	 * @param {Object} totalDataSize
	 * @return {function(*, *)}
	 */
	setTotalDataSize(gridName, totalDataSize) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setTotalDataSize({ gridName, totalDataSize }));
		};
	}

	/**
	 * Set page
	 * @param {String} gridName
	 * @param {Number} currentPage
	 * @param {Number} offset
	 * @return {function(*, *)}
	 */
	setPage(gridName, currentPage, offset) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setPage({ gridName, currentPage, offset }));
		};
	}

	/**
	 * Set number of row on the page
	 * @param {String} gridName
	 * @param {Number} value
	 * @return {function(*, *)}
	 */
	setPageSize(gridName, value) {
		return (dispatch) => {
			dispatch(this.setValue([gridName, 'sizePerPage'], value));
		};
	}

	/**
	 * Set sort
	 * @param {String} gridName
	 * @param {String} field
	 * @param {String} destination asc|desc
	 * @return {function(*, *)}
	 */
	setSort(gridName, field, destination) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setSort({ gridName, field, destination }));
		};
	}

	/**
	 * Set filter by field
	 * @param {String} gridName
	 * @param {Object} params
	 * @return {function(*, *)}
	 */
	setFilter(gridName, params) {
		return (dispatch) => new Promise((resolve) => {
			dispatch(this.reducer.actions.setFilter({ gridName, params }));
			dispatch(this.setPage(gridName, 1, 0));
			resolve();
		});
	}

	/**
	 * Get page options
	 * @param {String} gridName
	 */
	getPageOptions(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			const options = {
				count: state.grid.getIn([gridName, 'sizePerPage']),
				offset: state.grid.getIn([gridName, 'offset']),
			};

			if (state.grid.getIn([gridName, 'currentPage']) !== 1) {
				options.currentPage = state.grid.getIn([gridName, 'currentPage']);
			}

			return options;
		};
	}

	/**
	 * Get sort
	 * @param {String} gridName
	 */
	getSort(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			return {
				sortBy: state.grid.getIn([gridName, 'sort', 'field']),
				sortDestination: state.grid.getIn([gridName, 'sort', 'destination']),
			};
		};
	}

	/**
	 * Get filters by state
	 * @param {String} gridName
	 */
	getFilters(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			return state.grid.getIn([gridName, 'filters']);
		};
	}

	/**
	 * Clear by field
	 * @param {String} gridName
	 */
	clearByField(gridName) {
		return (dispatch) => {
			dispatch(this.reducer.actions.clearByField({ gridName }));
		};
	}

	/**
	 * Clear error by field
	 * @param {Array} field
	 * @returns {Function}
	 */
	clearError(field) {
		return (dispatch, getState) => {
			const state = getState();
			const error = state.grid.getIn(field);
			if (error) {
				dispatch(this.setValue(field, ''));
			}
		};
	}

	/**
	 * Wrapper for grid loading
	 * @param {String} gridName
	 * @param {Function} func Function for call
	 * @returns {function(*=): Promise<any>}
	 * @private
	 */
	_loadingMiddleware(gridName, func) {
		return (dispatch) => new Promise((resolve, reject) => {
			dispatch(this.clearTimeout(gridName));
			const loadingTimeout = setTimeout(() => {
				dispatch(this.setValue([gridName, 'loading'], true));
			}, 500);
			dispatch(this.setValue([gridName, 'loadingTimeout'], loadingTimeout));
			func().then((data) => {
				dispatch(this.setValue([gridName, 'loading'], false));
				dispatch(this.clearTimeout(gridName));
				resolve(data);
			}).catch((error) => {
				dispatch(this.setValue([gridName, 'loading'], false));
				dispatch(this.clearTimeout(gridName));
				reject(error);
			});
		});
	}

}

const GridActions = new GridActionsClass();
export default GridActions;
