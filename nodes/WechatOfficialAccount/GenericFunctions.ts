import { IExecuteFunctions } from 'n8n-workflow';
import HttpRequest from '@utils/HttpRequest';

export const createHttpClient = async (ctx: IExecuteFunctions, credentialType: string = '') => {
	const credentials = await ctx.getCredentials(credentialType);
	const { baseURL, expiresAt } = credentials as { baseURL: string; expiresAt: number };
	const httpClient = HttpRequest.create(
		{ baseURL, returnFullResponse: true, json: true, encoding: 'arraybuffer' },
		credentialType,
	);
	if (expiresAt - 300 * 1000 < Date.now()) {
		await httpClient.preAuthentication(ctx, credentials, {
			method: 'GET',
			url: '/cgi-bin/get_api_domain_ip',
		});
	}
	return httpClient;
};
