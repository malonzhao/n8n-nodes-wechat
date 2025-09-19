import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取在线客服列表',
	value: 'getOnlineAccounts',
	action: '获取在线客服列表',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/customservice/getonlinekflist',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['getOnlineAccounts'] } },
	properties,
);
