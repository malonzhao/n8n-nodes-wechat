import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '客服输入状态',
	value: 'setSessionTyping',
	action: '客服输入状态',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/message/custom/typing',
			body: {
				touser: '={{$parameter.touser}}',
				command: '={{$parameter.command}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户OpenID',
		name: 'touser',
		type: 'string',
		required: true,
		default: '',
	},
	{
		displayName: '命令',
		name: 'command',
		type: 'options',
		required: true,
		default: 'Typing',
		options: [
			{ name: '正在输入', value: 'Typing' },
			{ name: '取消正在输入', value: 'CancelTyping' },
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['setSessionTyping'] } },
	properties,
);
