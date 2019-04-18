/**
 *
 * @param actionType
 * @param payload?
 * @returns {{type: *, payload: *}}
 */
export default (actionType, payload = undefined) => ({
	type: actionType,
	payload,
});
