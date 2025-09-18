import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取永久素材列表(batchGetMaterial)',
	value: 'batchGetMaterial',
	action: '获取永久素材列表',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/material/batchget_material',
			body: {
				type: '={{$parameter.type}}',
				offset: '={{$parameter.offset}}',
				count: '={{$parameter.count}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '媒体类型(Type)',
		name: 'type',
		type: 'options',
		default: 'image',
		options: [
			{ name: '图片(Image)', value: 'image' },
			{ name: '语音(Voice)', value: 'voice' },
			{ name: '视频(Video)', value: 'video' },
			{ name: '图文(News)', value: 'news' },
		],
	},
	{
		displayName: '开始位置(Offset)',
		name: 'offset',
		type: 'number',
		default: 0,
	},
	{
		displayName: '数量(Count)',
		name: 'count',
		type: 'number',
		default: 20,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['batchGetMaterial'] } },
	properties,
);
