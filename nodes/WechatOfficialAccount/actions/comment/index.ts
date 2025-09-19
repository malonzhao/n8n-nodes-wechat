import { INodeProperties } from 'n8n-workflow';
import * as openArticleComment from './openArticleComment.operation';
import * as listComment from './listComment.operation';
import * as closeComment from './closeComment.operation';
import * as electComment from './electComment.operation';
import * as unelectComment from './unelectComment.operation';
import * as deleteComment from './deleteComment.operation';
import * as replyComment from './replyComment.operation';
import * as deleteReplyComment from './deleteReplyComment.operation';

export {
	openArticleComment,
	listComment,
	closeComment,
	electComment,
	unelectComment,
	deleteComment,
	replyComment,
	deleteReplyComment,
};

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['comment'] } },
		options: [
			openArticleComment.option,
			listComment.option,
			closeComment.option,
			electComment.option,
			unelectComment.option,
			deleteComment.option,
			replyComment.option,
			deleteReplyComment.option,
		],
	},
	...openArticleComment.description,
	...listComment.description,
	...closeComment.description,
	...electComment.description,
	...unelectComment.description,
	...deleteComment.description,
	...replyComment.description,
	...deleteReplyComment.description,
];
