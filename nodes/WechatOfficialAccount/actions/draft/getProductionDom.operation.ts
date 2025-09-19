import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取商品卡片的DOM结构',
	value: 'getDraft',
	action: '获取商品卡片的DOM结构',
	routing: {
		request: {
			method: 'GET',
			url: '/channels/ec/service/product/getcardinfo',
			body: {
				product_id: '={{$parameter.product_id}}',
				article_type: '={{$parameter.article_type}}',
				card_type: '={{$parameter.card_type}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '商品ID',
		name: 'product_id',
		type: 'string',
		default: '',
		required: true,
	},
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
		displayName: '卡片类型',
		name: 'card_type',
		type: 'options',
		default: 0,
		options: [
			{ name: '大卡', value: 0 },
			{ name: '小卡', value: 1 },
			{ name: '文字链接', value: 2 },
			{ name: '条卡', value: 3 },
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['draft'], operation: ['getDraft'] } },
	properties,
);
