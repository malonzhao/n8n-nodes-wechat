import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '标记评论精选',
	value: 'electComment',
	action: '标记评论精选',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/comment/markelect',
			body: {
				msg_data_id: '={{$parameter.msg_data_id}}',
				index: '={{$parameter.index}}',
				user_comment_id: '={{$parameter.user_comment_id}}',
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
		displayName: '用户评论ID',
		name: 'user_comment_id',
		type: 'string',
		required: true,
		default: '',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['comment'], operation: ['electComment'] } },
	properties,
);
