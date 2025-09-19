import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除标签',
	value: 'deleteTag',
	action: '删除标签',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/tags/delete',
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
		default: { id: '' },
		required: true,
		options: [
			{
				displayName: '标签ID',
				name: 'id',
				type: 'number',
				default: '',
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['deleteTag'] } },
	properties,
);
