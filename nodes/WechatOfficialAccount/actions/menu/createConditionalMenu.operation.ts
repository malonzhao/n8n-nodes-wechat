import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '创建个性化菜单',
	value: 'createConditionalMenu',
	action: '创建个性化菜单',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/menu/addconditional',
			body: {
				button: '={{parameter.button}}',
				matchrule: '={{parameter.matchrule}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '一级菜单（注意：一级菜单最多可添加3个）',
		name: 'button',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true, minItems: 1, maxItems: 3 },
		default: { button: [{ name: '', type: 'click', key: '' }] },
		placeholder: '添加一级菜单',
		options: [
			{
				displayName: '菜单配置',
				name: 'button',
				// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
				values: [
					{
						displayName: '菜单类型',
						name: 'type',
						type: 'options',
						default: 'click',
						// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
						options: [
							{ name: '点击事件', value: 'click' },
							{ name: '查看网页', value: 'view' },
							{ name: '扫码推事件', value: 'scancode_push' },
							{ name: '扫码推事件且弹出提示框', value: 'scancode_waitmsg' },
							{ name: '系统拍照发图', value: 'pic_sysphoto' },
							{ name: '拍照或者相册发图', value: 'pic_photo_or_album' },
							{ name: '微信相册发图', value: 'pic_weixin' },
							{ name: '发送位置', value: 'location_select' },
							{ name: '下发消息', value: 'media_id', description: '不支持文本、图文消息' },
							{
								name: '图文消息',
								value: 'article_id',
								description: '注意：填入内容发布后获得的article_id',
							},
							{
								name: '图文消息(仅查看)',
								value: 'article_view_limited',
								description: '注意：内容发布后获得的article_id，仅查看，无法分享，适用于未认证公众号',
							},
							{ name: '小程序', value: 'miniprogram' },
						],
					},
					{
						displayName: '菜单名称',
						name: 'name',
						type: 'string',
						default: '',
						hint: '注意：不超过16个字节',
						required: true,
					},
					{
						displayName: '菜单KEY值',
						name: 'key',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								type: [
									'click',
									'scancode_push',
									'scancode_waitmsg',
									'pic_sysphoto',
									'pic_photo_or_album',
									'pic_weixin',
									'location_select',
								],
							},
						},
						hint: '注意：用于消息接口推送，不超过128字节',
					},
					{
						displayName: '网页链接',
						name: 'url',
						type: 'string',
						default: '',
						hint: '用户点击菜单可打开链接，不超过1024字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必填。',
						displayOptions: { show: { type: ['view', 'miniprogram'] } },
					},
					{
						displayName: '素材ID',
						name: 'media_id',
						type: 'string',
						default: '',
						displayOptions: { show: { type: ['media_id'] } },
						hint: '调用永久素材管理接口返回的media_id',
					},
					{
						displayName: '小程序AppID',
						name: 'appid',
						type: 'string',
						default: '',
						hint: '注意：仅认证公众号可配置',
						displayOptions: { show: { type: ['miniprogram'] } },
					},
					{
						displayName: '小程序页面路径',
						name: 'pagepath',
						type: 'string',
						default: '',
						hint: '注意：仅认证公众号可配置',
						displayOptions: { show: { type: ['miniprogram'] } },
					},
					{
						displayName: '图文消息ID',
						name: 'article_id',
						type: 'string',
						default: '',
						displayOptions: { show: { type: ['article_id', 'article_view_limited'] } },
					},
					{
						displayName: '二级菜单（注意：同一个一级菜单下，最多可添加5个二级菜单）',
						name: 'sub_button',
						type: 'fixedCollection',
						typeOptions: { multipleValues: true, minItems: 1, maxItems: 5 },
						default: { sub_button: [] },
						placeholder: '添加二级菜单',
						options: [
							{
								displayName: '二级菜单配置',
								name: 'sub_button',
								// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
								values: [
									{
										displayName: '菜单类型',
										name: 'type',
										type: 'options',
										default: 'click',
										// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
										options: [
											{ name: '点击事件', value: 'click' },
											{ name: '查看网页', value: 'view' },
											{ name: '扫码推事件', value: 'scancode_push' },
											{ name: '扫码推事件且弹出提示框', value: 'scancode_waitmsg' },
											{ name: '系统拍照发图', value: 'pic_sysphoto' },
											{ name: '拍照或者相册发图', value: 'pic_photo_or_album' },
											{ name: '微信相册发图', value: 'pic_weixin' },
											{ name: '发送位置', value: 'location_select' },
											{ name: '下发消息', value: 'media_id', description: '不支持文本、图文消息' },
											{ name: '图文消息URL', value: 'article_id' },
											{
												name: '图文消息URL(仅查看)',
												value: 'article_view_limited',
												description: '仅可查看，无法分享，适用于未认证公众号',
											},
											{ name: '小程序', value: 'miniprogram' },
										],
									},
									{
										displayName: '菜单名称',
										name: 'name',
										type: 'string',
										default: '',
										description: '注意：不超过60个字节',
										required: true,
									},
									{
										displayName: '菜单KEY值',
										name: 'key',
										type: 'string',
										default: '',
										description: '注意：用于消息接口推送，不超过128字节。',
										displayOptions: {
											show: {
												type: [
													'click',
													'scancode_push',
													'scancode_waitmsg',
													'pic_sysphoto',
													'pic_photo_or_album',
													'pic_weixin',
													'location_select',
												],
											},
										},
									},
									{
										displayName: '网页链接',
										name: 'url',
										type: 'string',
										default: '',
										hint: '用户点击菜单可打开链接，不超过1024字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必填。',
										displayOptions: { show: { type: ['view', 'miniprogram'] } },
									},
									{
										displayName: '素材ID',
										name: 'media_id',
										type: 'string',
										default: '',
										displayOptions: { show: { type: ['media_id'] } },
										hint: '调用永久素材管理接口返回的media_id',
									},
									{
										displayName: '小程序AppID',
										name: 'appid',
										type: 'string',
										default: '',
										hint: '注意：仅认证公众号可配置',
										displayOptions: { show: { type: ['miniprogram'] } },
									},
									{
										displayName: '小程序页面路径',
										name: 'pagepath',
										type: 'string',
										default: '',
										hint: '注意：仅认证公众号可配置',
										displayOptions: { show: { type: ['miniprogram'] } },
									},
									{
										displayName: '图文消息ID',
										name: 'article_id',
										type: 'string',
										default: '',
										displayOptions: { show: { type: ['article_id', 'article_view_limited'] } },
									},
								],
							},
						],
					},
				],
			},
		],
	},
	{
		displayName: '菜单匹配规则',
		name: 'matchrule',
		type: 'collection',
		hint: '注意：至少有一个非空字段',
		default: { tag_id: '', client_platform_type: '' },
		options: [
			{
				displayName: '用户标签的ID',
				name: 'tag_id',
				type: 'string',
				hint: '注意：可通过用户标签管理接口获取',
				default: '',
			},
			{
				displayName: '客户端类型',
				name: 'client_platform_type',
				type: 'options',
				default: '',
				options: [
					{ name: '全部', value: '' },
					{ name: 'IOS', value: '1' },
					{ name: 'Android', value: '2' },
					{ name: '其他', value: '3' },
				],
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['menu'], operation: ['createConditionalMenu'] } },
	properties,
);
