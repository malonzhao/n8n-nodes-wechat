import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取所有客服账号',
	value: 'getAccounts',
	action: '获取所有客服账号',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/customservice/getkflist',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['getAccounts'] } },
	properties,
);
