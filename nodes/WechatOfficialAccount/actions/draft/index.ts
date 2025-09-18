import { INodeProperties } from 'n8n-workflow';
import * as switchDraft from './switchDraft.operation';
import * as createDraft from './createDraft.operation';
import * as getDraft from './getDraft.operation';
import * as updateDraft from './updateDraft.operation';
import * as deleteDraft from './deleteDraft.operation';
import * as batchGetDraft from './batchGetDraft.operation';
import * as countDraft from './countDraft.operation';

export { switchDraft, createDraft, getDraft, updateDraft, deleteDraft, batchGetDraft, countDraft };

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		default: '',
		noDataExpression: true,
		displayOptions: { show: { resource: ['draft'] } },
		options: [
			switchDraft.option,
			createDraft.option,
			getDraft.option,
			updateDraft.option,
			deleteDraft.option,
			batchGetDraft.option,
			countDraft.option,
		],
	},
	...switchDraft.description,
	...createDraft.description,
	...getDraft.description,
	...updateDraft.description,
	...deleteDraft.description,
	...batchGetDraft.description,
	...countDraft.description,
];
