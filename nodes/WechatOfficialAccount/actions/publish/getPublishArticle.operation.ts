import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取已发布图文信息',
	value: 'getPublishArticle',
	action: '获取已发布图文信息',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/freepublish/getarticle',
			body: { article_id: '={{$parameter.article_id}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{ displayName: '文章ID', name: 'article_id', type: 'string', default: '', required: true },
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['publish'], operation: ['getPublishArticle'] } },
	properties,
);
