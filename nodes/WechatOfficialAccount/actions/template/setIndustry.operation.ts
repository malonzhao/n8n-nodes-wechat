import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '设置所属行业',
	value: 'setIndustry',
	action: '设置所属行业',
	routing: {
		request: {
			method: 'POST',
			url: '/cgi-bin/template/api_set_industry',
			body: {
				industry_id1: '={{$parameter.industry_id1}}',
				industry_id2: '={{$parameter.industry_id2}}',
			},
		},
	},
};

const properties: INodeProperties[] = [
	{
		displayName: '主营行业编号',
		name: 'industry_id1',
		type: 'string',
		default: '',
		hint: '参考：https://developers.weixin.qq.com/doc/service/api/notify/template/api_setindustry.html',
		required: true,
	},
	{
		displayName: '副营行业编号',
		name: 'industry_id2',
		type: 'string',
		default: '',
		hint: '参考：https://developers.weixin.qq.com/doc/service/api/notify/template/api_setindustry.html',
		required: true,
	},
];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['template'], operation: ['setIndustry'] } },
	properties,
);
