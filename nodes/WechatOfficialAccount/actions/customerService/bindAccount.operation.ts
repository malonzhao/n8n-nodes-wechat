import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '邀请绑定客服账号',
	value: 'bindAccount',
	action: '邀请绑定客服账号',
	routing: {
		request: {
			method: 'POST',
			url: '/customservice/kfaccount/inviteworker',
			body: {
				kf_account: '={{$parameter.kf_account}}',
				invite_wx: '={{$parameter.invite_wx}}',
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
		displayName: '微信号',
		name: 'invite_wx',
		type: 'string',
		required: true,
		default: '',
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['customerService'], operation: ['bindAccount'] } },
	properties,
);
