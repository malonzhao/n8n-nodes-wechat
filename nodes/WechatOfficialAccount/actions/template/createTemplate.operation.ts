import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '选用模板',
	value: 'createTemplate',
	action: '选用模板',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/template/api_add_template',
			body: {
				template_id_short: '={{$parameter.template_id_short}}',
				keyword_name_list: '={{$parameter.keyword_name_list}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '模板编号',
		name: 'template_id_short',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '模板关键词',
		name: 'keyword_name_list',
		type: 'string',
		typeOptions: { multipleValues: true, multipleValueButtonText: '添加键词' },
		default: [''],
		hint: '注意：选用的类目模板的关键词，按顺序传入，如果为空，或者关键词不在模板库中，会返回40246错误码。',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['createTemplate'] } },
	properties,
);
