import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	NodeOperationError,
} from 'n8n-workflow';
import { getNodeParameters } from '@utils/Helpers';
import { obj2xml } from '@utils/Helpers';
import WechatCrypto from '@utils/WechatCrypto';
import * as respondText from './respondText.operation';
import * as respondImage from './respondImage.operation';
import * as respondVoice from './respondVoice.operation';
import * as respondVideo from './respondVideo.operation';
import * as respondMusic from './respondMusic.operation';
import * as respondNews from './respondNews.operation';

export { respondText, respondImage, respondVoice, respondVideo, respondMusic, respondNews };

export const description: INodeProperties[] = [
	{
		displayName: '操作(Operation)',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: '',
		displayOptions: { show: { resource: ['response'] } },
		options: [
			respondText.option,
			respondImage.option,
			respondVoice.option,
			respondVideo.option,
			respondMusic.option,
			respondNews.option,
		],
	},
	...respondText.description,
	...respondImage.description,
	...respondVoice.description,
	...respondVideo.description,
	...respondMusic.description,
	...respondNews.description,
];

const patchNodeParameters = (data: Record<string, any>): Record<string, any> => {
	const { ToUserName, FromUserName, CreateTime, MsgType, MediaId, Title, Description } = data;
	const common = { ToUserName, FromUserName, CreateTime, MsgType: MsgType.toLowerCase() };
	switch (MsgType) {
		case 'image':
			return { ...common, Image: { MediaId } };
		case 'voice':
			return { ...common, Voice: { MediaId } };
		case 'video':
			return { ...common, Video: { MediaId, Title, Description } };
		case 'music':
			const { MusicUrl, HQMusicUrl, ThumbMediaId } = data;
			return { ...common, Video: { Title, Description, MusicUrl, HQMusicUrl, ThumbMediaId } };
		case 'news':
			const { ArticleCount, Articles } = data;
			return { ...common, ArticleCount, Articles };
		default:
			const { Content = `未知消息类型：${MsgType}` } = data;
			return { ...common, Content };
	}
};

export const execute = async (ctx: IExecuteFunctions): Promise<INodeExecutionData[][]> => {
	const node = ctx.getNode();
	const triggerNodeName = 'Wechat OfficialAccount Trigger';
	const triggerNode = ctx
		.getParentNodes(node.name, { includeNodeParameters: true })
		.find(({ name }) => name === triggerNodeName);
	if (!triggerNode) throw new NodeOperationError(node, `该工作流需由${triggerNodeName}触发`);
	const nodeParameters = patchNodeParameters(getNodeParameters(ctx));
	let body = obj2xml({ xml: nodeParameters }).replace(/&amp;/g, '&');
	const { encryptType, token, aesKey } = triggerNode.parameters as Record<string, any>;
	if (encryptType === 'ciphertext') {
		const { appid } = await ctx.getCredentials('wechatOfficialAccountApi');
		body = obj2xml({
			xml: WechatCrypto.encryptResponse(body, aesKey as string, token as string, appid as string),
		});
	}
	ctx.sendResponse({ headers: { 'Content-Type': 'application/xml' }, statusCode: 200, body });
	return [ctx.helpers.returnJsonArray({ ...nodeParameters, success: true })];
};
