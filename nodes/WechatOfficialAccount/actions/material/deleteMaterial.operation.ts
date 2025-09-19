import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除永久素材(deleteMaterial)',
	value: 'deleteMaterial',
	action: '删除永久素材',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/material/del_material',
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
		description: '素材管理接口获得',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['deleteMaterial'] } },
	properties,
);
