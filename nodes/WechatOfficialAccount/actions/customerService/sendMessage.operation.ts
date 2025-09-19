import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '发送客服消息',
	value: 'sendMessage',
	action: '发送客服消息',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/message/custom/send',
			body: {
				customservice: '={{$parameter.customservice}}',
				touser: '={{$parameter.touser}}',
				msgtype: '={{$parameter.msgtype}}',
				text: '={{$parameter.text}}',
				image: '={{$parameter.image}}',
				voice: '={{$parameter.voice}}',
				video: '={{$parameter.video}}',
				music: '={{$parameter.music}}',
				news: '={{$parameter.news}}',
				mpnews: '={{$parameter.mpnews}}',
				mpnewsarticle: '={{$parameter.mpnewsarticle}}',
				msgmenu: '={{$parameter.msgmenu}}',
				wxcard: '={{$parameter.wxcard}}',
				miniprogrampage: '={{$parameter.miniprogrampage}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '客服信息',
		name: 'customservice',
		type: 'collection',
		default: { kf_account: '' },
		required: true,
		options: [
			{
				displayName: '客服账号',
				name: 'kf_account',
				type: 'string',
				hint: '注意：是完整客服账号，格式为：账号前缀@公众号微信号，例：test1@test',
				default: '',
			},
		],
	},
	{
		displayName: '用户OpenID',
		name: 'touser',
		type: 'string',
		required: true,
		default: '',
	},
	{
		displayName: '消息类型',
		name: 'msgtype',
		type: 'options',
		required: true,
		default: 'text',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{ name: '文本消息', value: 'text' },
			{ name: '图片消息', value: 'image' },
			{ name: '语音消息', value: 'voice' },
			{ name: '视频消息', value: 'video' },
			{ name: '音乐消息', value: 'music' },
			{ name: '图文消息(跳转到外链)', value: 'news' },
			{ name: '图文消息(跳转到图文消息页面)', value: 'mpnewsarticle' },
			{ name: '菜单消息', value: 'msgmenu' },
			{ name: '卡券信息', value: 'wxcard' },
			{ name: '小程序消息', value: 'miniprogrampage' },
		],
	},
	{
		displayName: '文本消息',
		name: 'text',
		type: 'collection',
		default: { content: '' },
		options: [{ displayName: '内容', name: 'content', type: 'string', default: '' }],
		displayOptions: { show: { msgtype: ['text'] } },
	},
	{
		displayName: '图片消息',
		name: 'image',
		type: 'collection',
		default: { media_id: '' },
		options: [{ displayName: '媒体ID', name: 'media_id', type: 'string', default: '' }],
		displayOptions: { show: { msgtype: ['image'] } },
	},
	{
		displayName: '语音消息',
		name: 'voice',
		type: 'collection',
		default: { media_id: '' },
		options: [{ displayName: '媒体ID', name: 'media_id', type: 'string', default: '' }],
		displayOptions: { show: { msgtype: ['voice'] } },
	},
	{
		displayName: '视频消息',
		name: 'video',
		type: 'collection',
		default: { media_id: '', thumb_media_id: '', title: '', description: '' },
		options: [
			{ displayName: '媒体ID', name: 'media_id', type: 'string', default: '' },
			{ displayName: '缩略图媒体ID', name: 'thumb_media_id', type: 'string', default: '' },
			{ displayName: '标题', name: 'title', type: 'string', default: '' },
			{ displayName: '描述', name: 'description', type: 'string', default: '' },
		],
		displayOptions: { show: { msgtype: ['video'] } },
	},
	{
		displayName: '音乐消息',
		name: 'music',
		type: 'collection',
		default: { title: '', description: '', musicurl: '', hqmusicurl: '', thumb_media_id: '' },
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{ displayName: '标题', name: 'title', type: 'string', default: '' },
			{ displayName: '描述', name: 'description', type: 'string', default: '' },
			{ displayName: '音乐链接', name: 'musicurl', type: 'string', default: '' },
			{ displayName: '高质量音乐链接', name: 'hqmusicurl', type: 'string', default: '' },
			{ displayName: '缩略图媒体ID', name: 'thumb_media_id', type: 'string', default: '' },
		],
		displayOptions: { show: { msgtype: ['music'] } },
	},
	{
		displayName: '图文消息',
		name: 'news',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true, minValue: 1, maxValue: 1 },
		default: { articles: [{ title: '', description: '', picurl: '', url: '' }] },
		description: '图文消息条数限制在1条以内',
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{
				displayName: '',
				name: 'articles',
				values: [
					{ displayName: '标题', name: 'title', type: 'string', default: '', required: true },
					{ displayName: '描述', name: 'description', type: 'string', default: '', required: true },
					{ displayName: '封面Url', name: 'picurl', type: 'string', default: '', required: true },
					{ displayName: '跳转Url', name: 'url', type: 'string', default: '', required: true },
				],
			},
		],
		displayOptions: { show: { msgtype: ['news'] } },
	},
	{
		displayName: '图文消息',
		name: 'mpnewsarticle',
		type: 'collection',
		default: { article_id: '' },
		options: [{ displayName: '文章ID', name: 'article_id', type: 'string', default: '' }],
		displayOptions: { show: { msgtype: ['mpnewsarticle'] } },
	},
	{
		displayName: '菜单消息',
		name: 'msgmenu',
		type: 'collection',
		default: { head_content: '', list: { list: [{ id: '', content: '' }] }, tail_content: '' },
		options: [
			{ displayName: '菜单描述', name: 'head_content', type: 'string', default: '' },
			{ displayName: '菜单结尾', name: 'tail_content', type: 'string', default: '' },
			{
				displayName: '菜单内容',
				name: 'list',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true, minValue: 1 },
				placeholder: '添加菜单消息',
				default: { list: [{ id: '', content: '' }] },
				options: [
					{
						displayName: '菜单内容',
						name: 'list',
						values: [
							{ displayName: '菜单值', name: 'id', type: 'string', default: '' },
							{ displayName: '菜单项', name: 'content', type: 'string', default: '' },
						],
					},
				],
			},
		],
		displayOptions: { show: { msgtype: ['msgmenu'] } },
	},
	{
		displayName: '卡券消息',
		name: 'wxcard',
		type: 'collection',
		default: { card_id: '' },
		options: [{ displayName: '卡券ID', name: 'card_id', type: 'string', default: '' }],
		displayOptions: { show: { msgtype: ['wxcard'] } },
	},
	{
		displayName: '小程序消息',
		name: 'miniprogrampage',
		type: 'collection',
		default: { title: '', appid: '', pagepath: '', thumb_media_id: '' },
		options: [
			{ displayName: '小程序卡片标题', name: 'title', type: 'string', default: '' },
			{ displayName: '小程序APPID', name: 'appid', type: 'string', default: '' },
			{ displayName: '小程序页面路径', name: 'pagepath', type: 'string', default: '' },
			{
				displayName: '封面媒体ID',
				name: 'thumb_media_id',
				type: 'string',
				default: '',
				hint: '建议：大小为 520*416',
			},
		],
		displayOptions: { show: { msgtype: ['miniprogrampage'] } },
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['sendMessage'] } },
	properties,
);
