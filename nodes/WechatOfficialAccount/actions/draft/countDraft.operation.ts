import { INodeProperties, INodePropertyOptions, updateDisplayOptions } from 'n8n-workflow';

export const option: INodePropertyOptions = {
	name: '获取草稿总数',
	value: 'countDraft',
	action: '获取草稿总数',
	routing: {
		request: {
			method: 'GET',
			url: '/cgi-bin/draft/count',
		},
	},
};

const properties: INodeProperties[] = [];

export const description: INodeProperties[] = updateDisplayOptions(
	{ show: { resource: ['draft'], operation: ['countDraft'] } },
	properties,
);
