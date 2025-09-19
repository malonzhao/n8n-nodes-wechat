import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '查询自定义菜单状态',
	value: 'getCustomMenuInfo',
	action: '查询自定义菜单状态',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/get_current_selfmenu_info',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['menu'], operation: ['getCustomMenuInfo'] } },
	properties,
);
