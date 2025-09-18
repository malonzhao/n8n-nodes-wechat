import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '新增临时素材(uploadTempMedia)',
	value: 'uploadTempMedia',
	action: '新增临时素材',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/media/upload',
			qs: { type: '={{$parameter.type}}' },
			body: { mediaBINARY_PROPERTY_NAME: '={{$parameter.mediaBINARY_PROPERTY_NAME}}' },
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
		displayName: '媒体文件(Media)',
		name: 'mediaBINARY_PROPERTY_NAME',
		type: 'string',
		default: 'data',
		required: true,
		hint: '注意：填入左侧输入面板含有二进制文件字段名称，默认为 "data"',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['uploadTempMedia'] } },
	properties,
);
