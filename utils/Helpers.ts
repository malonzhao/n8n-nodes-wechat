import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { js2xml, xml2js } from 'xml-js';
import FormData from 'form-data';
import mime from 'mime';
/**
 * 将对象转换为XML格式字符串
 */
export const obj2xml = (obj: any, options: Record<string, any> = {}): string => {
	return js2xml(obj, {
		compact: true,
		textFn: (v: any, _, o: any) => (typeof o === 'string' ? `<![CDATA[${v}]]>` : v),
		...options,
	});
};
/**
 * 将XML格式字符串转成成对象
 */
export const xml2obj = (xml: string, options: Record<string, any> = {}): any => {
	return xml2js(xml, {
		compact: true,
		textFn: (v) => {
			return !isNaN(Number(v)) ? Number(v) : ['true', 'false'].includes(v) ? v === 'true' : v;
		},
		...options,
	});
};
/**
 * 缩减同名数组冗余层级
 * @param obj
 */
export const flattenSameKeyArrays = (obj: any): any => {
	// 处理数组：递归处理每个元素
	if (Array.isArray(obj)) return obj.map((item) => flattenSameKeyArrays(item));
	// 处理对象：递归处理每个属性
	if (typeof obj === 'object' && obj !== null) {
		const result: Record<string, any> = {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				let value = flattenSameKeyArrays(obj[key]);
				// 检查是否满足缩减条件：
				// 1. 值是非数组对象
				// 2. 对象只有一个属性
				// 3. 该属性名与当前key相同
				// 4. 该属性的值是数组类型
				if (
					typeof value === 'object' &&
					!Array.isArray(value) &&
					Object.keys(value).length === 1 &&
					value[key] !== undefined &&
					Array.isArray(value[key])
				) {
					result[key] = value[key];
				} else {
					result[key] = value;
				}
			}
		}
		return result;
	}
	// 基本类型直接返回
	return obj;
};

export const getNodeParameters = (ctx: IExecuteFunctions): Record<string, any> => {
	const result = Object.keys(ctx.getNode().parameters)
		.filter((k) => !['resource', 'operation'].includes(k))
		.reduce((p, c) => ({ ...p, [c]: ctx.getNodeParameter(c, 0) }), {});
	return flattenSameKeyArrays(result);
};

export const buildUploadOptions = async (ctx: IExecuteFunctions, reqOptions: IHttpRequestOptions) => {
	if (!reqOptions?.body || !Object.prototype.toString.call(reqOptions.body).includes('Object')) {
		return reqOptions;
	}
	const formData = new FormData();
	for (let k of Object.keys(reqOptions.body)) {
		let v = (reqOptions.body as Record<string, any>)[k];
		if (k.endsWith('BINARY_PROPERTY_NAME')) {
			const fileField = k.replace('BINARY_PROPERTY_NAME', '');
			let { mimeType: contentType, fileName: filename, fileExtension } = ctx.helpers.assertBinaryData(0, v);
			const binaryData: Buffer = await ctx.helpers.getBinaryDataBuffer(0, v)
			if (!fileExtension) fileExtension = mime.getExtension(contentType) || ''
			if (fileExtension) filename = filename?.replace(`.${fileExtension}`, '') + `.${fileExtension}`
			formData.append(fileField, binaryData, { contentType, filename });
		} else {
			formData.append(k, JSON.stringify(v));
		}
	}
	reqOptions.headers = { ...reqOptions.headers, ...formData.getHeaders() };
	reqOptions.body = formData;
	return reqOptions as IHttpRequestOptions;
};
