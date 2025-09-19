import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取高清语音素材(getHDVoice)',
	value: 'getHDVoice',
	action: '获取高清语音素材',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/media/get/jssdk',
			qs: { media_id: '={{$parameter.media_id}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '媒体ID',
		name: 'media_id',
		type: 'string',
		default: '',
		description: '素材管理接口获得',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['material'], operation: ['getHDVoice'] } },
	properties,
);
