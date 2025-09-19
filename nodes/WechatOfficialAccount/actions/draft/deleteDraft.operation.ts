import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除草稿',
	value: 'deleteDraft',
	action: '删除草稿',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/draft/delete',
			body: {
				media_id: '={{$parameter.media_id}}',
			},
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
	{ show: { resource: ['draft'], operation: ['deleteDraft'] } },
	properties,
);
