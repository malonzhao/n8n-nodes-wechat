import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '回复文本消息',
	value: 'respondText',
	action: '回复文本消息',
};

const properties: INodeProperties[] = [
	{
		displayName: '接收方账号(ToUserName)',
		name: 'ToUserName',
		type: 'string',
		default: '={{$json.fromusername}}',
		description: '用户OpenID',
		required: true,
	},
	{
		displayName: '开发者微信号(FromUserName)',
		name: 'FromUserName',
		type: 'string',
		default: '={{$json.tousername}}',
		description: '公众号原始ID',
		required: true,
	},
	{
		displayName: '创建时间(CreateTime)',
		name: 'CreateTime',
		type: 'hidden',
		default: '={{Math.round($now.toSeconds())}}',
		required: true,
	},
	{
		displayName: '消息类型(MsgType)',
		name: 'MsgType',
		type: 'hidden',
		default: 'text',
		required: true,
	},
	{
		displayName: '文本信息(Text)',
		name: 'Content',
		type: 'string',
		default: '',
		description: '支持内容换行展示',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['response'], operation: ['respondText'] } },
	properties,
);
