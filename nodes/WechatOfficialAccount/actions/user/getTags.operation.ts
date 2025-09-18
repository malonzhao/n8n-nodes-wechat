import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取标签',
	value: 'getTags',
	action: '获取标签',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/tags/get',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['getTags'] } },
	properties,
);
