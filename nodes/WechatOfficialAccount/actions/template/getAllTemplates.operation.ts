import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取已选用模板列表',
	value: 'getAllTemplates',
	action: '获取已选用模板列表',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/template/get_all_private_template',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['getAllTemplates'] } },
	properties,
);
