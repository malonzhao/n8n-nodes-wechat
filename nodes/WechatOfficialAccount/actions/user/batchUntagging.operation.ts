import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '批量为用户取消标签',
	value: 'batchUntagging',
	action: '批量为用户取消标签',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/members/batchuntagging',
			body: {
				openid_list: '={{$parameter.openid_list}}',
				tagid: '={{$parameter.tagid}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '粉丝OpenID列表',
		name: 'openid_list',
		type: 'string',
		typeOptions: { multipleValues: true, multipleValueButtonText: '添加OpenID' },
		default: [''],
		required: true,
	},
	{
		displayName: '标签ID',
		name: 'tagid',
		type: 'number',
		default: '',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['batchUntagging'] } },
	properties,
);
