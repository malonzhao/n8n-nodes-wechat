import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取标签下粉丝列表',
	value: 'getTagFans',
	action: '获取标签下粉丝列表',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/user/tag/get',
			body: {
				tagid: '={{$parameter.tagid}}',
				next_openid: '={{$parameter.next_openid}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '标签ID',
		name: 'tagid',
		type: 'string',
		default: '',
	},
	{
		displayName: '起始用户OpenID',
		name: 'next_openid',
		type: 'string',
		default: '',
		hint: '说明：拉取起始OPENID，不填默认从头开始拉取',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['getTagFans'] } },
	properties,
);
