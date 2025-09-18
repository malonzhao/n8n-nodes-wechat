import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '发布草稿',
	value: 'draftPublish',
	action: '发布草稿',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/freepublish/submit',
			body: { media_id: '={{$parameter.media_id}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '媒体ID',
		name: 'media_id',
		type: 'string',
		default: '',
		required: true,
		hint: '说明：输入草稿的media_id',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['publish'], operation: ['draftPublish'] } },
	properties,
);
