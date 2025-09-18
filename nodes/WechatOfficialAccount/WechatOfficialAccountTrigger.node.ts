import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';
import WechatCrypto from '@utils/WechatCrypto';
import { xml2obj } from '@utils/Helpers';
export class WechatOfficialAccountTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wechat OfficialAccount Trigger',
		name: 'wechatOfficialAccountTrigger',
		icon: 'file:WechatOfficialAccount.svg',
		group: ['trigger'],
		version: 1,
		description: 'Triggers the workflow when Server-Sent Events occur',
		activationMessage: 'You can now make calls to your SSE URL to trigger executions.',
		defaults: { name: 'Wechat OfficialAccount Trigger' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'wechatOfficialAccountApi', required: true }],
		properties: [
			{
				displayName: '令牌(Token)',
				name: 'token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				required: true,
			},
			{
				displayName: '消息加解密方式',
				name: 'encryptType',
				type: 'options',
				options: [
					{ name: '明文模式', value: 'plaintext' },
					{ name: '兼容模式', value: 'compatible' },
					{ name: '安全模式', value: 'ciphertext' },
				],
				default: 'plaintext',
			},
			{
				displayName: '消息加解密密钥(EncodingAESKey)',
				name: 'aesKey',
				type: 'string',
				typeOptions: { password: true },
				displayOptions: {
					show: {
						encryptType: ['compatible', 'ciphertext'],
					},
				},
				default: '',
			},
		],
		webhooks: [
			{
				name: 'setup',
				httpMethod: 'GET',
				path: 'official-account',
				responseMode: 'onReceived',
			},
			{
				name: 'default',
				httpMethod: 'POST',
				path: 'official-account',
				responseMode: 'responseNode',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const { method, query, body } = this.getRequestObject();
		const { signature, timestamp, nonce, echostr, encrypt_type, msg_signature } = query as {
			signature: string;
			timestamp: string;
			nonce: string;
			echostr: string;
			encrypt_type: string;
			msg_signature: string;
		};
		const token = this.getNodeParameter('token') as string;
		const encryptType = this.getNodeParameter('encryptType') as string;
		if (!signature || !timestamp || !nonce) {
			throw new NodeOperationError(this.getNode(), '签名参数缺失');
		}
		if (!WechatCrypto.checkSignature(signature, token, timestamp, nonce)) {
			throw new NodeOperationError(this.getNode(), '签名或参数无效');
		}
		if (method === 'GET' && !encrypt_type && !!echostr) {
			this.getResponseObject().send(echostr);
			return { noWebhookResponse: true };
		}
		const { encrypt } = body.xml;
		if (encryptType !== 'ciphertext') {
			if (encrypt) delete body.xml.encrypt;
			return { workflowData: [this.helpers.returnJsonArray(body.xml)] };
		}
		if (encrypt_type !== 'aes') {
			throw new NodeOperationError(this.getNode(), '当前配置的加密方式与公众号配置的不一致');
		}
		if (!WechatCrypto.checkSignature(msg_signature, token, timestamp, nonce, encrypt)) {
			throw new NodeOperationError(this.getNode(), '加密签名无效');
		}
		const aesKey = this.getNodeParameter('aesKey', 0) as string;
		if (!aesKey) throw new NodeOperationError(this.getNode(), '消息加解密密钥(EncodingAESKey)缺失');
		try {
			const obj = xml2obj(WechatCrypto.decrypt(encrypt, aesKey)).xml;
			const data = Object.keys(obj).reduce(
				(p, c) => ({ ...p, [c.toLowerCase()]: Object.values(obj[c])[0] }),
				{},
			);
			return { workflowData: [this.helpers.returnJsonArray(data)] };
		} catch (error) {
			throw new NodeOperationError(this.getNode(), error.message);
		}
	}
}
