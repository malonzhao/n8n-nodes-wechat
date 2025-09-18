import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取临时素材(getMedia)',
	value: 'getMedia',
	action: '获取临时素材',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/media/get',
			qs: { media_id: '={{$parameter.media_id}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '媒体ID',
		name: 'media_id',
		type: 'string',
		default: '',
		description: '素材管理接口获得',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['getMedia'] } },
	properties,
);
