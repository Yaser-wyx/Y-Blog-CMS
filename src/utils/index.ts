export function createObjectByKeys(obj: any, excluded: string[]): any {
	let result = {};
	Object.keys(obj).forEach(key => {
		if (!excluded.includes(key)) {
			result[key] = obj[key];
		}
	});
	return result;
}

export function calculateWords(text: String):number {
	//用word方式计算正文字数
	let str = text;
	str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
	str = str.replace(/[\x00-\xff]/g, "m");
	str = str.replace(/m+/g, "*");
	str = str.replace(/龘+/g, "");
	return str.length;
}
