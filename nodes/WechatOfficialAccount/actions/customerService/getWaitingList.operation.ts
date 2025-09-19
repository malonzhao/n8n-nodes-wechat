import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取未接入会话列表',
	value: 'getWaitingList',
	action: '获取未接入会话列表',
	routing: {
		request: {
			method: 'GET',
			url: '/customservice/kfsession/getwaitcase',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['getWaitingList'] } },
	properties,
);
