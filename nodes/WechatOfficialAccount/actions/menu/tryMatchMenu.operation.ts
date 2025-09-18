import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '测试个性化菜单匹配结果',
	value: 'tryMatchMenu',
	action: '测试个性化菜单匹配结果',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/menu/trymatch',
			body: { user_id: '={{$parameter.user_id}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户ID',
		name: 'user_id',
		type: 'string',
		default: '',
		hint: '注意：填入用户OpenID或微信号',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['menu'], operation: ['tryMatchMenu'] } },
	properties,
);
