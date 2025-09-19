import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '批量为用户添加标签',
	value: 'batchTagging',
	action: '批量为用户添加标签',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/members/batchtagging',
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
		hint: '注意：最多50个',
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
	{ show: { resource: ['user'], operation: ['batchTagging'] } },
	properties,
);
