import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '查看指定文章的评论数据',
	value: 'listComment',
	action: '查看指定文章的评论数据',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/comment/list',
			body: {
				msg_data_id: '={{$parameter.msg_data_id}}',
				index: '={{$parameter.index}}',
				begin: '={{$parameter.begin}}',
				count: '={{$parameter.count}}',
				type: '={{$parameter.type}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '消息数据ID',
		name: 'msg_data_id',
		type: 'string',
		required: true,
		default: '',
		hint: '注意：是群发返回的msg_data_id',
	},
	{
		displayName: '图文索引',
		name: 'index',
		type: 'number',
		default: 0,
		hint: '注意：多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文',
	},
	{
		displayName: '起始位置',
		name: 'begin',
		type: 'number',
		required: true,
		default: 0,
	},
	{
		displayName: '获取数目',
		name: 'count',
		type: 'number',
		required: true,
		default: 50,
		hint: '注意：获取数目(>=50会被拒绝)',
	},
	{
		displayName: '评论类型',
		name: 'type',
		type: 'options',
		required: true,
		default: 0,
		options: [
			{ name: '普通评论&精选评论', value: 0 },
			{ name: '普通评论', value: 1 },
			{ name: '精选评论', value: 2 },
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['comment'], operation: ['listComment'] } },
	properties,
);
