import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取客户会话状态',
	value: 'getSession',
	action: '获取客户会话状态',
	routing: {
		request: {
			method: 'POST',
			url: '/customservice/kfsession/getsession',
			qs: {
				openid: '={{$parameter.openid}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户OpenID',
		name: 'openid',
		type: 'string',
		required: true,
		default: '',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['getSession'] } },
	properties,
);
