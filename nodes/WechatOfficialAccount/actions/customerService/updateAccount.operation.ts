import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '修改客服账号',
	value: 'updateAccount',
	action: '修改客服账号',
	routing: {
		request: {
			method: 'POST',
			url: '/customservice/kfaccount/update',
			body: {
				kf_account: '={{$parameter.kf_account}}',
				nickname: '={{$parameter.nickname}}',
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
	{
		displayName: '客服昵称',
		name: 'nickname',
		type: 'string',
		required: true,
		default: '',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['updateAccount'] } },
	properties,
);
