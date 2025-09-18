import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '批量获取用户基本信息',
	value: 'batchGetUserInfo',
	action: '批量获取用户基本信息',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/user/info/batchget',
			body: { user_list: '={{$parameter.user_list}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户列表',
		name: 'user_list',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		placeholder: '添加用户',
		default: { user_list: [{ openid: '', lang: '' }] },
		hint: '注意：一次最多支持拉取100条数据',
		options: [
			{
				displayName: '用户列表',
				name: 'user_list',
				values: [
					{
						displayName: '用户OpenID',
						name: 'openid',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: '语言',
						name: 'lang',
						type: 'string',
						default: '',
						hint: '说明：国家地区语言版本，例：zh_CN',
					},
				],
			},
		],
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['batchGetUserInfo'] } },
	properties,
);
