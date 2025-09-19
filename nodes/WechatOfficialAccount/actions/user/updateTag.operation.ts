import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '编辑标签',
	value: 'updateTag',
	action: '编辑标签',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/update',
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
		default: { id: '', name: '' },
		required: true,
		options: [
			{
				displayName: '标签ID',
				name: 'id',
				type: 'number',
				default: '',
			},
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
	{ show: { resource: ['user'], operation: ['updateTag'] } },
	properties,
);
