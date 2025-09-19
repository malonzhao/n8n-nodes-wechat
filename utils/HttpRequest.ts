import {
	IAdditionalCredentialOptions,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodeCredentialsDetails,
	DeclarativeRestApiSettings,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';
import HttpRequestOptions = DeclarativeRestApiSettings.HttpRequestOptions;

type Context = IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions;

export default class HttpRequest {
	private static instance: HttpRequest;
	private readonly baseOptions: HttpRequestOptions;
	private credentialsType: string = '';
	private reqOptions: IHttpRequestOptions = {} as IHttpRequestOptions;
	constructor(baseOptions = {}) {
		this.baseOptions = baseOptions;
	}

	static create(baseOptions?: HttpRequestOptions, credentialsType?: string): HttpRequest {
		if (!HttpRequest.instance) {
			HttpRequest.instance = new HttpRequest(baseOptions);
			if (credentialsType) HttpRequest.instance.credentialsType = credentialsType;
		}
		return HttpRequest.instance;
	}

	async preAuthentication(
		ctx: Context,
		cred: ICredentialDataDecryptedObject,
		options: IHttpRequestOptions,
	) {
		const credType = this.credentialsType;
		const reqOptions = { ...this.baseOptions, ...options } as IHttpRequestOptions;
		const { id, name } = ctx.getNode()?.credentials?.[credType] as INodeCredentialsDetails;
		const credentialsDecrypted = { id, name, type: credType, data: { ...cred, sessionToken: '' } };
		return await ctx.helpers.httpRequestWithAuthentication.call(ctx, credType, reqOptions, {
			credentialsDecrypted,
		} as IAdditionalCredentialOptions);
	}

	async retry(ctx: Context) {
		const { credentialsType, reqOptions } = this;
		const { id, name } = ctx.getNode()?.credentials?.[credentialsType] as INodeCredentialsDetails;
		const credentialsDecrypted = { id, name, type: credentialsType, data: { sessionToken: '' } };
		if (credentialsType) {
			return await ctx.helpers.httpRequestWithAuthentication.call(
				ctx,
				credentialsType,
				reqOptions,
				{ credentialsDecrypted } as IAdditionalCredentialOptions,
			);
		} else {
			return await ctx.helpers.httpRequest.call(ctx, reqOptions);
		}
	}

	async request(ctx: Context, reqOptions = {} as HttpRequestOptions) {
		this.reqOptions = {
			...this.baseOptions,
			...reqOptions,
			headers: { ...this.baseOptions.headers, ...reqOptions.headers },
		} as IHttpRequestOptions;
		if (this.credentialsType) {
			return await ctx.helpers.httpRequestWithAuthentication.call(
				ctx,
				this.credentialsType,
				this.reqOptions,
			);
		} else {
			return await ctx.helpers.httpRequest.call(ctx, this.reqOptions);
		}
	}
}
