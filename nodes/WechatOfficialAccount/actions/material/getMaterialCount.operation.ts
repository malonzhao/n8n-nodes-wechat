import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取永久素材总数(getMaterialCount)',
	value: 'getMaterialCount',
	action: '获取永久素材总数',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/material/get_materialcount',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['getMaterialCount'] } },
	properties,
);
