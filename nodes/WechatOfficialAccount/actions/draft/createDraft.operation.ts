import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '新增草稿',
	value: 'createDraft',
	action: '新增草稿',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/draft/add',
			body: {
				articles: '={{$parameter.articles}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '图文素材集合',
		name: 'articles',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {
			articles: [
				{
					article_type: 'news',
					title: '',
					author: '',
					digest: '',
					content: '',
					content_source_url: '',
					thumb_media_id: '',
					need_open_comment: 0,
					only_fans_can_comment: 0,
					pic_crop_235_1: '',
					pic_crop_1_1: '',
				},
			],
		},
		placeholder: '添加图文素材',
		options: [
			{
				displayName: '',
				name: 'articles',
				// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
				values: [
					{
						displayName: '文章类型',
						name: 'article_type',
						type: 'options',
						default: 'news',
						options: [
							{ name: '图文消息', value: 'news' },
							{ name: '图片消息', value: 'newspic' },
						],
					},
					{
						displayName: '标题',
						name: 'title',
						type: 'string',
						default: '',
						required: true,
						displayOptions: { show: { article_type: ['news', 'newspic'] } },
					},
					{
						displayName: '作者',
						name: 'author',
						type: 'string',
						default: '',
						displayOptions: { show: { article_type: ['news'] } },
					},
					{
						displayName: '摘要',
						name: 'digest',
						type: 'string',
						default: '',
						displayOptions: { show: { article_type: ['news'] } },
						hint: '注意：仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前54个字。',
					},
					{
						displayName: '消息内容',
						name: 'content',
						type: 'string',
						default: '',
						required: true,
						displayOptions: { show: { article_type: ['news', 'newspic'] } },
						hint: '注意：支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS，涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。 图片消息则仅支持纯文本和部分特殊功能标签如商品，商品个数不可超过50个',
					},
					{
						displayName: '原文地址',
						name: 'content_source_url',
						type: 'string',
						default: '',
						displayOptions: { show: { article_type: ['news'] } },
						hint: '说明：点击“阅读原文”后的URL',
					},
					{
						displayName: '封面媒体ID',
						name: 'thumb_media_id',
						type: 'string',
						default: '',
						displayOptions: { show: { article_type: ['news'] } },
						hint: '注意：必须是永久MediaID',
					},
					{
						displayName: '是否打开评论',
						name: 'need_open_comment',
						type: 'options',
						default: 0,
						displayOptions: { show: { article_type: ['news', 'newspic'] } },
						options: [
							{ name: '否', value: 0 },
							{ name: '是', value: 1 },
						],
					},
					{
						displayName: '是否粉丝才可评论',
						name: 'only_fans_can_comment',
						type: 'options',
						default: 0,
						displayOptions: { show: { article_type: ['news', 'newspic'] } },
						options: [
							{ name: '否', value: 0 },
							{ name: '是', value: 1 },
						],
					},
					{
						displayName: '消息封面裁剪为2.35:1规格坐标',
						name: 'pic_crop_235_1',
						type: 'string',
						default: '',
						displayOptions: { show: { article_type: ['news'] } },
						hint: '说明：以原始图片（thumb_media_id）左上角（0,0），右下角（1,1）建立平面坐标系，经过裁剪后的图片，其左上角所在的坐标即为（X1,Y1）,右下角所在的坐标则为（X2,Y2），用分隔符_拼接为X1_Y1_X2_Y2，每个坐标值的精度为不超过小数点后6位数字。示例见下图，图中(X1,Y1) 等于（0.1945,0）,(X2,Y2)等于（1,0.5236），所以请求参数值为0.1945_0_1_0.5236',
					},
					{
						displayName: '消息封面裁剪为1:1规格坐标',
						name: 'pic_crop_1_1',
						type: 'string',
						default: '',
						displayOptions: { show: { article_type: ['news'] } },
						hint: '说明：裁剪原理同上，裁剪后的图片必须符合规格要求',
					},
					{
						displayName: '图片信息',
						name: 'image_info',
						type: 'fixedCollection',
						typeOptions: { multipleValues: true, minItems: 1, maxItems: 20 },
						default: { image_list: [{ image_media_id: '' }] },
						required: true,
						displayOptions: { show: { article_type: ['newspic'] } },
						hint: '注意：图片数量最多为20张，首张图片即为封面图',
						placeholder: '添加图片信息',
						options: [
							{
								displayName: '图片列表',
								name: 'image_list',
								values: [
									{
										displayName: '图片素材ID',
										name: 'image_media_id',
										type: 'string',
										required: true,
										default: '',
										hint: '图片消息里的图片素材id（必须是永久MediaID）',
									},
								],
							},
						],
					},
					{
						displayName: '封面信息',
						name: 'cover_info',
						type: 'fixedCollection',
						typeOptions: { multipleValues: true, minItems: 1, maxItems: 20 },
						default: { crop_percent_list: [{ ratio: '1_1', x1: '', y1: '', x2: '', y2: '' }] },
						displayOptions: { show: { article_type: ['newspic'] } },
						placeholder: '添加封面信息',
						options: [
							{
								displayName: '封面裁剪信息',
								name: 'crop_percent_list',
								// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
								values: [
									{
										displayName: '裁剪比例',
										name: 'ratio',
										type: 'options',
										default: '1_1',
										options: [
											{ name: '1:1', value: '1_1' },
											{ name: '16:9', value: '16_9' },
											{ name: '2.35:1', value: '2.35_1' },
										],
									},
									{ displayName: '左上角坐标X值', name: 'x1', type: 'string', default: '' },
									{ displayName: '左上角坐标Y值', name: 'y1', type: 'string', default: '' },
									{ displayName: '右下角坐标X值', name: 'x2', type: 'string', default: '' },
									{ displayName: '右下角坐标Y值', name: 'y2', type: 'string', default: '' },
								],
							},
						],
					},
					{
						displayName: '商品信息',
						name: 'product_info',
						type: 'collection',
						default: { footer_product_info: { product_key: '' } },
						displayOptions: { show: { article_type: ['newspic'] } },
						options: [
							{
								displayName: '文末的商品相关信息',
								name: 'footer_product_info',
								type: 'collection',
								default: { product_key: '' },
								options: [
									{ displayName: '商品Key', name: 'product_key', type: 'string', default: '' },
								],
							},
						],
					},
				],
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['draft'], operation: ['createDraft'] } },
	properties,
);
