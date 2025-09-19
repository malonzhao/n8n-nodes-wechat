import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除模板',
	value: 'deleteTemplate',
	action: '删除模板',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/template/del_private_template',
			body: {
				template_id: '={{$parameter.template_id}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '模板编号',
		name: 'template_id',
		type: 'string',
		default: '',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['deleteTemplate'] } },
	properties,
);
