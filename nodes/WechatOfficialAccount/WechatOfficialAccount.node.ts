import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeProperties,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

import { buildUploadOptions, getNodeParameters } from '@utils/Helpers';
import { createHttpClient } from './GenericFunctions';
import { IWechatOfficialAccount, Resource, Operation } from './WechatOfficialAccount.type';
import * as resources from '@nodes/WechatOfficialAccount/actions';
type ResourceKey = keyof typeof resources;
const properties = Object.keys(resources).reduce(
	(p, c) => p.concat(resources[c as ResourceKey].description as INodeProperties[]),
	[] as INodeProperties[],
);

export class WechatOfficialAccount implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wechat OfficialAccount',
		name: 'wechatOfficialAccount',
		icon: 'file:WechatOfficialAccount.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["resource"] + ": " + $parameter["operation"] }}',
		description: 'Wechat OfficialAccount',
		defaults: { name: 'Wechat OfficialAccount' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'wechatOfficialAccountApi', required: true }],
		properties: [
			{
				displayName: '资源(Resource)',
				name: 'resource',
				type: 'options',
				default: 'response',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{ name: '被动回复', value: 'response' },
					{ name: '留言管理', value: 'comment' },
					{ name: '客服消息', value: 'customerService' },
					{ name: '素材管理', value: 'material' },
					{ name: '草稿管理', value: 'draft' },
					{ name: '菜单管理', value: 'menu' },
					{ name: '发布管理', value: 'publish' },
					{ name: '消息模板管理', value: 'template' },
					{ name: '用户管理', value: 'user' },
				],
			},
			...properties,
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter<IWechatOfficialAccount>('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0);
		const OA = { resource, operation } as IWechatOfficialAccount;
		// 获取 Resource 中的 properties
		const resourceProps = resources[OA.resource] as Resource;
		type OpType = keyof typeof resourceProps;
		// 获取 Operation 中的 properties
		const operationProps = resourceProps[OA.operation as OpType] as unknown as Operation;
		// 获取 Operation、Resource 中定义的 execute 函数，优先取 Operation中，Resource次之
		const execute = operationProps?.execute || resourceProps?.execute;
		// 如果有可执行的 execute 函数，则直接执行该函数并返回数据，否则由当前兜底处理并返回数据
		if (execute) return [this.helpers.returnJsonArray(await execute(this))];
		// 获取 Operation 中 requestOptions 配置
		let requestOptions = operationProps.option.routing!.request as IHttpRequestOptions;
		if (!requestOptions) throw new NodeOperationError(this.getNode(), `未找到${operation}请求配置`);
		// 获取当前操作节点参数
		const nodeParameters = getNodeParameters(this);
		let { qs = {}, body = {} } = requestOptions;
		qs = Object.keys(qs).reduce((p, c) => ({ ...p, [c]: nodeParameters[c] }), {});
		body = Object.keys(body as object).reduce((p, c) => ({ ...p, [c]: nodeParameters[c] }), {});
		requestOptions = { ...requestOptions, qs, body } as IHttpRequestOptions;
		// 判断是否存在上传文件字段
		const fileFieldNames = Object.keys(body).filter((key) => key.endsWith('BINARY_PROPERTY_NAME'));
		if (fileFieldNames.length) requestOptions = await buildUploadOptions(this, requestOptions);
		// 创建 http 客户端
		const httpClient = await createHttpClient(this, 'wechatOfficialAccountApi');
		try {
			const { headers, body } = await httpClient.request(this, requestOptions);
			const res = { json: {}, binary: {} };
			// 判断 http 是否有附件下载响应，如果有，则下载文件并以 binaryData 输出，如果没有，则以 json 输出
			const contentDisposition = headers['content-disposition'] || '';
			if (contentDisposition && contentDisposition.includes('attachment')) {
				let mimeType = headers['content-type'] as string | undefined;
				mimeType = mimeType ? mimeType.split(';').find((value) => value.includes('/')) : undefined;
				const match = /(?<=filename=").*\b/.exec(contentDisposition as string);
				const fileName = match !== null ? match[0] : '';
				const data = await this.helpers.prepareBinaryData(body, fileName, mimeType);
				res.binary = { data };
			} else {
				res.json = JSON.parse(body.toString('utf8'));
			}
			return [this.helpers.returnJsonArray(res)];
		} catch (err) {
			throw new NodeOperationError(this.getNode(), err);
		}
	}
}
