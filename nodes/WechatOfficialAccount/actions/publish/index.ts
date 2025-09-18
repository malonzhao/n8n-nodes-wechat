import { INodeProperties } from 'n8n-workflow';
import * as batchGetPublish from './batchGetPublish.operation';
import * as deletePublish from './deletePublish.operation';
import * as getPublish from './getPublish.operation';
import * as getPublishArticle from './getPublishArticle.operation';
import * as draftPublish from './draftPublish.operation';

export { batchGetPublish, deletePublish, getPublish, getPublishArticle, draftPublish };

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['publish'] } },
		options: [
			batchGetPublish.option,
			deletePublish.option,
			getPublish.option,
			getPublishArticle.option,
			draftPublish.option,
		],
	},
	...batchGetPublish.description,
	...deletePublish.description,
	...getPublish.description,
	...getPublishArticle.description,
	...draftPublish.description,
];
