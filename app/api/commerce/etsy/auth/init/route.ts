import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import {
	createHash,
	createCipheriv,
	createDecipheriv,
	randomBytes,
	scryptSync,
} from 'node:crypto';
import { getXataClient } from '@/lib/xata';
import { encode } from 'node:querystring';

const sha256 = (input: string) => {
	const hash = createHash('sha256');
	hash.update(input);
	return hash.digest('base64url');
};

const createVerifier = () => randomBytes(32).toString('base64url');

export const GET = async (req: NextRequest) => {
	const xata = getXataClient();

	const searchParams = new URL(req.url).searchParams;
	const brandId = searchParams.get('brandId');

  const verifier = createVerifier();

	const account = await xata.db.etsyAccount.create({
		brand: brandId,
    verifier: verifier
	});
	redirect(
		`https://www.etsy.com/oauth/connect?${encode({
			response_type: 'code',
			client_id: process.env.ETSY_API_KEY,
			redirect_uri: 'https://localhost:3000/api/commerce/etsy/auth/callback',
			state: account.id,
			scope: 'listings_r listings_w transactions_r profile_r shops_r',
			code_challenge_method: 'S256',
			code_challenge: sha256(verifier),
		})}`
	);
};
