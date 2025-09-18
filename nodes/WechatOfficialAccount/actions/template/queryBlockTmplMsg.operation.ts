import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '查询拦截的模板消息',
	value: 'queryBlockTmplMsg',
	action: '查询拦截的模板消息',
	routing: {
		request: {
			method: 'POST',
			url: '/wxa/sec/queryblocktmplmsg',
			body: {
				tmpl_msg_id: '={{$parameter.tmpl_msg_id}}',
				largest_id: '={{$parameter.largest_id}}',
				limit: '={{$parameter.limit}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '模板消息ID',
		name: 'tmpl_msg_id',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '上一页查询结果最大的ID',
		name: 'largest_id',
		type: 'number',
		default: 0,
		hint: '说明：用于翻页，第一次传0',
		required: true,
	},
	{
		displayName: '分页大小',
		name: 'limit',
		type: 'number',
		// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
		typeOptions: { minValue: 1, maxValue: 100 },
		description: 'Max number of results to return',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-limit
		default: 10,
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['queryBlockTmplMsg'] } },
	properties,
);
