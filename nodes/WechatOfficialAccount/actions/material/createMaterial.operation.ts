import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '上传永久素材',
	value: 'createMaterial',
	action: '上传永久素材',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/material/add_material',
			qs: { type: '={{$parameter.type}}' },
			body: {
				mediaBINARY_PROPERTY_NAME: '={{$parameter.mediaBINARY_PROPERTY_NAME}}',
				description: '={{$parameter.description}}',
			},
			json: false,
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
			{ name: '缩略图(Thumb)', value: 'thumb' },
		],
	},
	{
		displayName: '媒体文件(Media)',
		name: 'mediaBINARY_PROPERTY_NAME',
		type: 'string',
		default: 'data',
		required: true,
		hint: '注意：填入左侧输入面板含有二进制文件字段名称，默认为 "data"',
	},
	{
		displayName: '描述(Description)',
		name: 'description',
		type: 'collection',
		default: { title: '', introduction: '' },
		description: '素材描述信息，上传视频素材时需要',
		options: [
			{
				displayName: '标题(Title)',
				name: 'title',
				type: 'string',
				default: '',
			},
			{
				displayName: '简介(Introduction)',
				name: 'introduction',
				type: 'string',
				default: '',
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['createMaterial'] } },
	properties,
);
