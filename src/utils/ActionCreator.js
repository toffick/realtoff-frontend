/**
 *
 * @param actionType
 * @param payload?
 * @returns {{type: *, payload: *}}
 */
export default (actionType, payload = null) => ({
	type: actionType,
	payload,
});
