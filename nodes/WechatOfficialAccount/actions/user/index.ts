import { INodeProperties } from 'n8n-workflow';

import * as batchUnblacklist from './batchUnblacklist.operation';
import * as getBlacklist from './getBlacklist.operation';
import * as getUserInfo from './getUserInfo.operation';
import * as batchGetUserInfo from './batchGetUserInfo.operation';
import * as getFans from './getFans.operation';
import * as batchBlacklist from './batchBlacklist.operation';
import * as updateRemark from './updateRemark.operation';

import * as getTagFans from './getTagFans.operation';
import * as getTags from './getTags.operation';
import * as createTag from './createTag.operation';
import * as updateTag from './updateTag.operation';
import * as deleteTag from './deleteTag.operation';
import * as batchUntagging from './batchUntagging.operation';
import * as batchTagging from './batchTagging.operation';
import * as getTagIdList from './getTagIdList.operation';

export {
	batchUnblacklist,
	getBlacklist,
	getUserInfo,
	batchGetUserInfo,
	getFans,
	batchBlacklist,
	updateRemark,
	getTagFans,
	getTags,
	createTag,
	updateTag,
	deleteTag,
	batchUntagging,
	batchTagging,
	getTagIdList,
};

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['user'] } },
		options: [
			batchUnblacklist.option,
			getBlacklist.option,
			getUserInfo.option,
			batchGetUserInfo.option,
			getFans.option,
			batchBlacklist.option,
			updateRemark.option,

			getTagFans.option,
			getTags.option,
			createTag.option,
			updateTag.option,
			deleteTag.option,
			batchUntagging.option,
			batchTagging.option,
			getTagIdList.option,
		],
	},
	...batchUnblacklist.description,
	...getBlacklist.description,
	...getUserInfo.description,
	...batchGetUserInfo.description,
	...getFans.description,
	...batchBlacklist.description,
	...updateRemark.description,

	...getTagFans.description,
	...getTags.description,
	...createTag.description,
	...updateTag.description,
	...deleteTag.description,
	...batchUntagging.description,
	...batchTagging.description,
	...getTagIdList.description,
];
