import {
	Icon,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
	IAuthenticateGeneric,
} from 'n8n-workflow';

export class WechatOfficialAccountApi implements ICredentialType {
	displayName = 'Wechat OfficialAccount API';
	name = 'wechatOfficialAccountApi';
	icon: Icon = 'file:WechatOfficialAccount.svg';
	documentationUrl = 'https://developers.weixin.qq.com/doc/service/guide/';
	properties: INodeProperties[] = [
		{
			displayName: '接口基础地址(BaseURL)',
			name: 'baseURL',
			type: 'hidden',
			default: 'https://api.weixin.qq.com',
		},
		{
			displayName: '开发者ID(AppID)',
			description: '开发者ID是账号开发识别码，配合开发者密码可调用账号的接口能力。',
			name: 'appid',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: '开发者密码(AppSecret)',
			name: 'secret',
			description: '开发者密码是校验账号开发者身份的密码，具有极高的安全性。',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'SessionToken',
			name: 'sessionToken',
			type: 'hidden',
			default: '',
			typeOptions: { expirable: true, password: true },
		},
		{
			displayName: 'expiresAt',
			name: 'expiresAt',
			type: 'hidden',
			default: 0,
		},
	];
	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const { baseURL, appid, secret } = credentials as Record<string, string>;
		const qs = { grant_type: 'client_credential', appid, secret };
		const res = await this.helpers.httpRequest({
			method: 'GET',
			baseURL,
			url: '/cgi-bin/token',
			qs,
		});
		if (res.errcode && res.errcode !== 0) throw new Error(`授权失败: ${res.errmsg}`);
		return { sessionToken: res.access_token, expiresAt: Date.now() + res.expires_in * 1000 };
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: { qs: { access_token: '={{$credentials.sessionToken}}' } },
	};

	test: ICredentialTestRequest = {
		request: { url: '={{$credentials.baseURL}}/cgi-bin/get_api_domain_ip' },
		rules: [
			{
				type: 'responseSuccessBody',
				properties: { key: 'errcode', value: 0, message: '凭证验证失败' },
			},
		],
	};
}
