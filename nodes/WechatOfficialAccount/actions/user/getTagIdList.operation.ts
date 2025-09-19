import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取用户的标签列表',
	value: 'getTagIdList',
	action: '获取用户的标签列表',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/getidlist',
			body: {
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
		default: '',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['getTagIdList'] } },
	properties,
);
