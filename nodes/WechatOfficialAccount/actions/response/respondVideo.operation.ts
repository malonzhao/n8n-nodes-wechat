import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '回复视频消息',
	value: 'respondVideo',
	action: '回复视频消息',
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
		default: 'video',
		required: true,
	},
	{
		displayName: '媒体ID',
		name: 'MediaId',
		type: 'string',
		default: '',
		description: '素材管理接口获得',
	},
	{
		displayName: '标题(Title)',
		name: 'Title',
		type: 'string',
		default: '',
	},
	{
		displayName: '描述(Description)',
		name: 'Description',
		type: 'string',
		typeOptions: { rows: 3 },
		default: '',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['response'], operation: ['respondVideo'] } },
	properties,
);
