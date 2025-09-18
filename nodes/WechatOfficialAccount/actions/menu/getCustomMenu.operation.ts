import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取自定义菜单配置',
	value: 'getCustomMenu',
	action: '获取自定义菜单配置',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/menu/get',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['menu'], operation: ['getCustomMenu'] } },
	properties,
);
