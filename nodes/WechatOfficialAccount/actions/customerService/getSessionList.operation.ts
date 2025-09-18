import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取客服会话列表',
	value: 'getSessionList',
	action: '获取客服会话列表',
	routing: {
		request: {
			method: 'GET',
			url: '/customservice/kfsession/getsessionlist',
			qs: {
				kf_account: '={{$parameter.kf_account}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '客服账号',
		name: 'kf_account',
		type: 'string',
		required: true,
		default: '',
		hint: '注意：是完整客服账号，格式为：账号前缀@公众号微信号，例：test1@test',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['getSessionList'] } },
	properties,
);
