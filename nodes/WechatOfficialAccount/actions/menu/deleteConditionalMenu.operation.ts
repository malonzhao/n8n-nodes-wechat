import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '删除个性化菜单',
	value: 'deleteConditionalMenu',
	action: '删除个性化菜单',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/menu/delconditional',
			body: { menuid: '={{$parameter.menuid}}' },
		},
	},
};

const properties: INodeProperties[] = [
	{ displayName: '菜单ID', name: 'menuid', type: 'string', default: '', required: true },
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['menu'], operation: ['deleteConditionalMenu'] } },
	properties,
);
