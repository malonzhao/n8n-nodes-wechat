import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '关闭会话',
	value: 'closeSession',
	action: '关闭会话',
	routing: {
		request: {
			method: 'POST',
			url: '/customservice/kfsession/close',
			body: {
				kf_account: '={{$parameter.kf_account}}',
				openid: '={{$parameter.openid}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '客服账号',
		name: 'kf_account',
		type: 'string',
		required: true,
		default: '',
		hint: '注意：是完整客服账号，格式为：账号前缀@公众号微信号，例：test1@test',
	},
	{
		displayName: '用户OpenID',
		name: 'openid',
		type: 'string',
		required: true,
		default: '',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['closeSession'] } },
	properties,
);
