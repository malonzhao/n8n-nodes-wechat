import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '音乐(Music)',
	value: 'respondMusic',
	action: '回复音乐消息',
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
		default: 'music',
		required: true,
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
		default: '',
	},
	{
		displayName: '音乐链接(MusicUrl)',
		name: 'MusicUrl',
		type: 'string',
		default: '',
	},
	{
		displayName: '高质量音乐链接(HQMusicUrl)',
		name: 'HQMusicUrl',
		type: 'string',
		default: '',
		description: 'WIFI环境优先使用',
	},
	{
		displayName: '缩略图素材MediaId(ThumbMediaId)',
		name: 'ThumbMediaId',
		type: 'string',
		default: '',
		description: '素材管理接口获得',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['response'], operation: ['respondMusic'] } },
	properties,
);
