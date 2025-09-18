import { INodeProperties } from 'n8n-workflow';

import * as createCustomMenu from './createCustomMenu.operation';
import * as getCustomMenu from './getCustomMenu.operation';
import * as getCustomMenuInfo from './getCustomMenuInfo.operation';
import * as deleteCustomMenu from './deleteCustomMenu.operation';
import * as createConditionalMenu from './createConditionalMenu.operation';
import * as deleteConditionalMenu from './deleteConditionalMenu.operation';
import * as tryMatchMenu from './tryMatchMenu.operation';

export {
	createCustomMenu,
	getCustomMenu,
	getCustomMenuInfo,
	deleteCustomMenu,
	createConditionalMenu,
	deleteConditionalMenu,
	tryMatchMenu,
};

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['menu'] } },
		options: [
			createCustomMenu.option,
			getCustomMenu.option,
			getCustomMenuInfo.option,
			deleteCustomMenu.option,
			createConditionalMenu.option,
			deleteConditionalMenu.option,
			tryMatchMenu.option,
		],
	},
	...createCustomMenu.description,
	...getCustomMenu.description,
	...getCustomMenuInfo.description,
	...deleteCustomMenu.description,
	...createConditionalMenu.description,
	...deleteConditionalMenu.description,
	...tryMatchMenu.description,
];
