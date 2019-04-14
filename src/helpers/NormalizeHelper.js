class NormalizeHelper {

	static removeEmptyValuesField(object) {
		return Object
			.keys(object)
			.reduce((acc, item) => object[item] ? object[item].length !== 0 ? { ...acc, [item]: object[item] } : acc : acc, {});
	}

	static removeUndefinedValuesField(object) {
		return Object
			.keys(object)
			.reduce((acc, item) => (object[item] === undefined ? acc : { ...acc, [item]: object[item] }), {});
	}

}

export default NormalizeHelper;
