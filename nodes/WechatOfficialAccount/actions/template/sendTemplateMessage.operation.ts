import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
	NodeOperationError,
	updateDisplayOptions,
} from 'n8n-workflow';
import { getNodeParameters } from '@utils/Helpers';
import { createHttpClient } from '@nodes/WechatOfficialAccount/GenericFunctions';

export const option: INodePropertyOptions = {
	name: '发送模板消息',
	value: 'sendTemplateMessage',
	action: '发送模板消息',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/message/template/send',
			body: {
				touser: '={{$parameter.touser}}',
				template_id: '={{$parameter.template_id}}',
				url: '={{$parameter.url}}',
				miniprogram: '={{$parameter.miniprogram}}',
				data: '={{$parameter.data}}',
				client_msg_id: '={{$parameter.client_msg_id}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户OpenId',
		name: 'touser',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '模板ID',
		name: 'template_id',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '模板跳转链接',
		name: 'url',
		type: 'string',
		default: '',
		hint: '注意：海外账号没有跳转能力，url 和 miniprogram 同时不填，无跳转，url 和 miniprogram 同时填写，优先跳转小程序',
	},
	{
		displayName: '小程序跳转配置',
		name: 'miniprogram',
		type: 'collection',
		default: { appid: '', pagepath: '' },
		hint: '注意：url 和 miniprogram 同时不填，无跳转，page 和 miniprogram 同时填写，优先跳转小程序',
		options: [
			{ displayName: '小程序Appid', name: 'appid', type: 'string', default: '' },
			{ displayName: '小程序跳转路径', name: 'pagepath', type: 'string', default: '' },
		],
	},
	{
		displayName: '模板内容',
		name: 'data',
		type: 'json',
		default: '{}',
		hint: '注意：需根据模板给定的格式给出（参考注意事项），格式形如: { "key1": { "value": any }, "key2": { "value": any } }',
		required: true,
	},
	{
		displayName: '防重入ID',
		name: 'client_msg_id',
		type: 'string',
		default: '',
		hint: '说明：对于同一个openid + client_msg_id, 只发送一条消息,10分钟有效,超过10分钟不保证效果。若无防重入需求，可不填',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['sendTemplateMessage'] } },
	properties,
);

export const execute = async (ctx: IExecuteFunctions): Promise<INodeExecutionData[][]> => {
	let requestOptions = option.routing!.request as IHttpRequestOptions;
	const nodeParameters = getNodeParameters(ctx);
	nodeParameters.data = JSON.parse(nodeParameters.data);
	let { qs = {}, body = {} } = requestOptions;
	qs = Object.keys(qs).reduce((p, c) => ({ ...p, [c]: nodeParameters[c] }), {});
	body = Object.keys(body as object).reduce((p, c) => ({ ...p, [c]: nodeParameters[c] }), {});
	requestOptions = { ...requestOptions, qs, body } as IHttpRequestOptions;
	const httpClient = await createHttpClient(ctx, 'wechatOfficialAccountApi');
	try {
		const { body } = await httpClient.request(ctx, requestOptions);
		return [ctx.helpers.returnJsonArray({ json: JSON.parse(body.toString('utf8')) })];
	} catch (err) {
		throw new NodeOperationError(ctx.getNode(), err);
	}
};
