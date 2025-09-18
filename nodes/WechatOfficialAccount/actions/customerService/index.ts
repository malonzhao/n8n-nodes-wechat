import { INodeProperties } from 'n8n-workflow';
import * as createSession from './createSession.operation';
import * as closeSession from './closeSession.operation';
import * as getSession from './getSession.operation';
import * as getSessionList from './getSessionList.operation';
import * as getWaitingList from './getWaitingList.operation';

import * as setSessionTyping from './setSessionTyping.operation';
import * as sendMessage from './sendMessage.operation';
import * as getMessageList from './getMessageList.operation';

import * as createAccount from './createAccount.operation';
import * as updateAccount from './updateAccount.operation';
import * as deleteAccount from './deleteAccount.operation';
import * as getAccounts from './getAccounts.operation';
import * as getOnlineAccounts from './getOnlineAccounts.operation';
import * as bindAccount from './bindAccount.operation';

export {
	createSession,
	closeSession,
	getSession,
	getSessionList,
	getWaitingList,
	setSessionTyping,
	sendMessage,
	getMessageList,
	createAccount,
	updateAccount,
	deleteAccount,
	getAccounts,
	getOnlineAccounts,
	bindAccount,
};

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['customerService'] } },
		options: [
			createSession.option,
			closeSession.option,
			getSession.option,
			getSessionList.option,
			getWaitingList.option,
			setSessionTyping.option,
			sendMessage.option,
			getMessageList.option,
			createAccount.option,
			updateAccount.option,
			deleteAccount.option,
			getAccounts.option,
			getOnlineAccounts.option,
			bindAccount.option,
		],
	},
	...createSession.description,
	...closeSession.description,
	...getSession.description,
	...getSessionList.description,
	...getWaitingList.description,
	...setSessionTyping.description,
	...sendMessage.description,
	...getMessageList.description,
	...createAccount.description,
	...updateAccount.description,
	...deleteAccount.description,
	...getAccounts.description,
	...getOnlineAccounts.description,
	...bindAccount.description,
];
