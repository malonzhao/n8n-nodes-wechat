import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除自定义菜单',
	value: 'deleteCustomMenu',
	action: '删除自定义菜单',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/menu/delete',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['menu'], operation: ['deleteCustomMenu'] } },
	properties,
);
