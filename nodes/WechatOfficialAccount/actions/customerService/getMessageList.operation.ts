import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取聊天记录',
	value: 'getMessageList',
	action: '获取聊天记录',
	routing: {
		request: {
			method: 'POST',
			url: '/customservice/msgrecord/getmsglist',
			body: {
				starttime: '={{$parameters.starttime}}',
				endtime: '={{$parameters.endtime}}',
				msgid: '={{$parameters.msgid}}',
				number: '={{$parameters.number}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '开始时间',
		name: 'starttime',
		type: 'string',
		hint: '注意：格式为10位纯数字',
		default: '={{Math.round($now.toSeconds())}}',
		required: true,
	},
	{
		displayName: '结束时间',
		name: 'endtime',
		type: 'string',
		hint: '注意：格式为10位纯数字',
		default: '={{Math.round($now.toSeconds())}}',
		required: true,
	},
	{
		displayName: '消息ID',
		name: 'msgid',
		type: 'number',
		typeOptions: { minValue: 0, maxValue: 9999999999 },
		default: 0,
		required: true,
	},
	{
		displayName: '数量',
		name: 'number',
		type: 'number',
		typeOptions: { minValue: 0, maxValue: 100 },
		default: 10,
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['getMessageList'] } },
	properties,
);
