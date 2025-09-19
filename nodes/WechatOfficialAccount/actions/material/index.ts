import { INodeProperties } from 'n8n-workflow';
import * as getMaterial from './getMaterial.operation';
import * as getMaterialCount from './getMaterialCount.operation';
import * as batchGetMaterial from './batchGetMaterial.operation';
import * as uploadImage from './uploadImage.operation';
import * as createMaterial from './createMaterial.operation';
import * as deleteMaterial from './deleteMaterial.operation';
import * as getMedia from './getMedia.operation';
import * as uploadTempMedia from './uploadTempMedia.operation';
import * as getHDVoice from './getHDVoice.operation';

export {
	getMaterial,
	getMaterialCount,
	batchGetMaterial,
	uploadImage,
	createMaterial,
	deleteMaterial,
	getMedia,
	uploadTempMedia,
	getHDVoice,
};

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['material'] } },
		options: [
			getMaterial.option,
			getMaterialCount.option,
			batchGetMaterial.option,
			uploadImage.option,
			createMaterial.option,
			deleteMaterial.option,
			getMedia.option,
			uploadTempMedia.option,
			getHDVoice.option,
		],
	},
	...getMaterial.description,
	...getMaterialCount.description,
	...batchGetMaterial.description,
	...uploadImage.description,
	...createMaterial.description,
	...deleteMaterial.description,
	...getMedia.description,
	...uploadTempMedia.description,
	...getHDVoice.description,
];
