import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '设置用户备注名',
	value: 'updateRemark',
	action: '设置用户备注名',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/user/info/updateremark',
			body: {
				openid: '={{$parameter.openid}}',
				remark: '={{$parameter.remark}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '用户OpenID',
		name: 'openid',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: '备注',
		name: 'remark',
		type: 'string',
		default: '',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['user'], operation: ['updateRemark'] } },
	properties,
);
