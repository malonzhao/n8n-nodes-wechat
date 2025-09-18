import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取已发布的消息列表',
	value: 'batchGetPublish',
	action: '获取已发布的消息列表',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/freepublish/batchget',
			body: {
				offset: '={{$parameter.offset}}',
				count: '={{$parameter.count}}',
				no_content: '={{$parameter.no_content}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '开始位置(Offset)',
		name: 'offset',
		type: 'number',
		typeOptions: { minValue: 0 },
		default: 0,
	},
	{
		displayName: '数量(Count)',
		name: 'count',
		type: 'number',
		typeOptions: { maxValue: 20 },
		default: 10,
	},
	{
		displayName: '是否返回Content字段',
		name: 'no_content',
		type: 'options',
		default: 0,
		options: [
			{ name: '是', value: 0 },
			{ name: '否', value: 1 },
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['publish'], operation: ['batchGetPublish'] } },
	properties,
);
