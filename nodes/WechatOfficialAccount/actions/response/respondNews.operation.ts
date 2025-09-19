import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '回复图文消息',
	value: 'respondNews',
	action: '回复图文消息',
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
		default: 'news',
		required: true,
	},
	{
		displayName: '图文消息数(ArticleCount)',
		name: 'ArticleCount',
		type: 'hidden',
		default: '={{($parameter?.Articles?.item||[]).length}}',
	},
	{
		displayName: '图文消息(Articles)',
		name: 'Articles',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true, multipleValueButtonText: 'aaa' },
		placeholder: '添加图文消息',
		default: [{ Title: '', Description: '', PicUrl: '', Url: '' }],
		options: [
			{
				displayName: '图文消息(Articles)',
				name: 'item',
				values: [
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
						displayName: '图片链接(PicUrl)',
						name: 'PicUrl',
						type: 'string',
						default: '',
						description: '支持JPG、PNG格式，建议尺寸：大图(360*200)、小图(200*200)',
					},
					{
						displayName: '文章链接(Url)',
						name: 'Url',
						type: 'string',
						default: '',
						description: '支持JPG、PNG格式，建议尺寸：大图(360*200)、小图(200*200)',
					},
				],
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['response'], operation: ['respondNews'] } },
	properties,
);
