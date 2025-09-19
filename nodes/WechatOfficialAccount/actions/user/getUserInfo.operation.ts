import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取用户基本信息',
	value: 'getUserInfo',
	action: '获取用户基本信息',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/user/info',
			qs: {
				openid: '={{$parameter.openid}}',
				lang: '={{$parameter.lang}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户OpenID',
		name: 'openid',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '语言',
		name: 'lang',
		type: 'string',
		default: '',
		hint: '说明：国家地区语言版本，例：zh_CN',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['getUserInfo'] } },
	properties,
);
