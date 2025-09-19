import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '拉黑用户',
	value: 'batchBlacklist',
	action: '拉黑用户',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/members/batchblacklist',
			body: {
				openid_list: '={{$parameter.openid_list}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: 'OpenID列表',
		name: 'openid_list',
		type: 'string',
		typeOptions: { multipleValues: true, multipleValueButtonText: '添加OpenID' },
		description: '注意：一次最多可操作20个用户',
		default: [''],
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['batchBlacklist'] } },
	properties,
);
