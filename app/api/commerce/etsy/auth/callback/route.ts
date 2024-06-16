import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getXataClient } from '@/lib/xata';
import { EncryptionService } from '@infrastructure/encryption';

interface EtsyTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
}

interface EtsyTokenErrorResponse {
	error: string;
	error_description: string;
}

const isEtsyTokenErrorResponse = (
	response: any
): response is EtsyTokenErrorResponse => !!response.error;

export const GET = async (req: NextRequest) => {
	const xata = getXataClient();
	const encryptionService = new EncryptionService();
	const searchParams = new URL(req.url).searchParams;
	const code = searchParams.get('code')!;
	const accountId = searchParams.get('state')!;

	if (!code || !accountId) return NextResponse.json(null, { status: 400 });

	const account = await xata.db.etsyAccount
		.select(['*'])
		.filter({ id: accountId })
		.getFirstOrThrow();

	const response = await fetch('https://api.etsy.com/v3/public/oauth/token', {
		method: 'POST',
		body: JSON.stringify({
			code,
			grant_type: 'authorization_code',
			client_id: process.env.ETSY_API_KEY,
			redirect_uri: 'https://localhost:3000/api/commerce/etsy/auth/callback',
			code_verifier: account.verifier,
		}),
	});

	const tokenResponse: EtsyTokenResponse | EtsyTokenErrorResponse =
		await response.json();

	if (isEtsyTokenErrorResponse(tokenResponse))
		throw new Error('Etsy OAuth2 ' + tokenResponse.error_description);

	const etsyMeResponse = await fetch(
		'https://openapi.etsy.com/v3/application/users/me',
		{
			headers: {
				'x-api-key': process.env.ETSY_API_KEY!,
				Authorization: `Bearer ${tokenResponse.access_token}`,
			},
		}
	);
	const etsyMe: { user_id: string; shop_id: string } =
		await etsyMeResponse.json();

	const shopResponse = await fetch(
		`https://openapi.etsy.com/v3/application/shops/${etsyMe.shop_id}`,
		{
			headers: {
				'x-api-key': process.env.ETSY_API_KEY!,
			},
		}
	);
	const shop = await shopResponse.json();

	await xata.db.etsyAccount.update({
		id: accountId,
		userId: `${etsyMe.user_id}`,
		shopId: `${etsyMe.shop_id}`,
		data: JSON.stringify(shop),
		token: encryptionService.encrypt(
			JSON.stringify({
				accessToken: tokenResponse.access_token,
				refreshToken: tokenResponse.refresh_token,
				expiresAt: Date.now() + (tokenResponse.expires_in - 30) * 1000,
			})
		),
	});

	const brandId = account.brand?.id;

	redirect(`/studio/brands/${brandId}`);
};
