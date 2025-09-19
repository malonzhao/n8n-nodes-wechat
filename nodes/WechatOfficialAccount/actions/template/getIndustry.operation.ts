import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取行业信息',
	value: 'getIndustry',
	action: '获取行业信息',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/template/get_industry',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['getIndustry'] } },
	properties,
);
