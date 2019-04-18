class NormalizeHelper {

	static removeEmptyValuesFields(object) {
		const copyObject = { ...object };

		Object.keys(copyObject).forEach((key) => (copyObject[key].length === 0 ? delete copyObject[key] : null));

		return copyObject;
	}

	static removeUndefinedValuesFields(object) {
		const copyObject = { ...object };

		Object.keys(copyObject).forEach((key) => (copyObject[key] === undefined ? delete copyObject[key] : null));

		return copyObject;
	}

}

export default NormalizeHelper;
