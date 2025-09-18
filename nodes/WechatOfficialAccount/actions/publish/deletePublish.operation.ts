import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除发布文章',
	value: 'deletePublish',
	action: '删除发布文章',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/freepublish/delete',
			body: { article_id: '={{$parameter.article_id}}', index: '={{$parameter.index}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '文章ID',
		name: 'article_id',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '文章位置',
		name: 'index',
		type: 'number',
		default: 0,
		hint: '说明：是指要删除的文章在图文消息中的位置，第一篇编号为1，该字段不填或填0会删除全部文章',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['publish'], operation: ['deletePublish'] } },
	properties,
);
