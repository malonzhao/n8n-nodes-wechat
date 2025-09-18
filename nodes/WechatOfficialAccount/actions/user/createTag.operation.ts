import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '创建标签',
	value: 'createTag',
	action: '创建标签',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/create',
			body: {
				tag: '={{$parameter.tag}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '标签信息',
		name: 'tag',
		type: 'collection',
		default: { name: '' },
		required: true,
		options: [
			{
				displayName: '标签名',
				name: 'name',
				type: 'string',
				hint: '注意：名称应在30个字符以内',
				default: '',
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['createTag'] } },
	properties,
);
