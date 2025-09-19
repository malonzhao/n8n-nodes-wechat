import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '草稿箱开关设置',
	value: 'switchDraft',
	action: '草稿箱开关设置',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/draft/switch',
			qs: {
				checkonly: '={{$parameter.checkonly}}',
			},
		},
	},
};

export const properties: INodeProperties[] = [
	{
		displayName: '是否仅检查状态',
		name: 'checkonly',
		type: 'options',
		default: 0,
		options: [
			{ name: '否', value: 0 },
			{ name: '是', value: 1 },
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['draft'], operation: ['switchDraft'] } },
	properties,
);
