import { INodeProperties } from 'n8n-workflow';
import * as sendTemplateMessage from './sendTemplateMessage.operation';
import * as createTemplate from './createTemplate.operation';
import * as queryBlockTmplMsg from './queryBlockTmplMsg.operation';
import * as deleteTemplate from './deleteTemplate.operation';
import * as getAllTemplates from './getAllTemplates.operation';
import * as getIndustry from './getIndustry.operation';
import * as setIndustry from './setIndustry.operation';

export {
	sendTemplateMessage,
	createTemplate,
	queryBlockTmplMsg,
	deleteTemplate,
	getAllTemplates,
	getIndustry,
	setIndustry,
};

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['template'] } },
		options: [
			sendTemplateMessage.option,
			createTemplate.option,
			queryBlockTmplMsg.option,
			deleteTemplate.option,
			getAllTemplates.option,
			getIndustry.option,
			setIndustry.option,
		],
	},
	...sendTemplateMessage.description,
	...createTemplate.description,
	...queryBlockTmplMsg.description,
	...deleteTemplate.description,
	...getAllTemplates.description,
	...getIndustry.description,
	...setIndustry.description,
];
