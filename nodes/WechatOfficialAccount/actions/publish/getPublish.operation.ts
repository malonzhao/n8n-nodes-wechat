import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '发布状态查询',
	value: 'getPublish',
	action: '发布状态查询',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/freepublish/get',
			body: { publish_id: '={{$parameter.publish_id}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{ displayName: '发布任务ID', name: 'publish_id', type: 'number', default: '', required: true },
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['publish'], operation: ['getPublish'] } },
	properties,
);
