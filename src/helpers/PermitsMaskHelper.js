/* eslint-disable no-bitwise */
import { RENT_PERMITS } from '../constants/OfferConstants';

class PermitsMaskHelper {

	/**
	 *
	 * @param mask
	 * @returns {any[]}
	 */
	static getPermitsByMask(mask) {
		const permitsArray = Object.values(RENT_PERMITS);
		const maskNumber = Number(mask);

		return permitsArray.filter((permitId) => permitId.flag & maskNumber);
	}

	/**
	 *
	 * @param oldMask
	 * @param volumeBit
	 * @returns {number}
	 */
	static mergeMask(oldMask, volumeBit) {
		return oldMask & volumeBit ?
			oldMask ^ volumeBit
			:
			oldMask | volumeBit;
	}

}

export default PermitsMaskHelper;
