import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '上传图文消息图片(uploadImage)',
	value: 'uploadImage',
	action: '上传图文消息图片',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/media/uploadimg',
			body: { mediaBINARY_PROPERTY_NAME: '={{$parameter.mediaBINARY_PROPERTY_NAME}}' },
		},
	},
};

const properties: INodeProperties[] = [
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
	{ show: { resource: ['material'], operation: ['uploadImage'] } },
	properties,
);
