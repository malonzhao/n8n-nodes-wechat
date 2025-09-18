import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取公众号的黑名单列表',
	value: 'getBlacklist',
	action: '获取公众号的黑名单列表',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/members/getblacklist',
			body: {
				begin_openid: '={{$parameter.begin_openid}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '起始OpenID',
		name: 'begin_openid',
		type: 'string',
		default: '',
		hint: '注意：输入为空时从开头拉取',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['getBlacklist'] } },
	properties,
);
