import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取关注用户列表',
	value: 'getFans',
	action: '获取关注用户列表',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/user/get',
			body: { next_openid: '={{$parameter.next_openid}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '起始用户OpenID',
		name: 'next_openid',
		type: 'string',
		default: '',
		hint: '说明：拉取起始OPENID，不填默认从头开始拉取',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['getFans'] } },
	properties,
);
