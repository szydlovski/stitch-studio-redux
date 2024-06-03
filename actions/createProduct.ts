'use server';
import { auth as getSession } from '@/config/auth';
import { XataClient, getXataClient } from '@/lib/xata';
import z from 'zod';

const createProductSchema = z.object({
	title: z.string(),
	thumbnail: z.string(),
	data: z.string(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

const parseFormData = <T>(data: FormData): T =>
	Object.fromEntries(data.entries()) as T;

interface RouteOptions {
	auth?: boolean;
}

interface RequestContext<Params> {
	params: Params;
	xata: XataClient;
}

export const routeHandler = async <Params, T = any>(
	handler: (req: Request, ctx: RequestContext<Params>) => T,
	options?: RouteOptions
) => {
	const xata = getXataClient();
	return async (req: Request, { params }: { params: Params }) => {
		const session = await getSession();
		if (options?.auth && !session) {
			return Response.json(
				{ error: true, message: 'Unauthorized' },
				{ status: 401 }
			);
		}
		return handler(req, { params, xata });
	};
};

export const createProduct = async (data: FormData) => {
	const xata = getXataClient();
	const session = await getSession();
	if (!session) {
		return { success: false, message: 'Unauthorized' };
	}
	// console.log(session);

	const payload = parseFormData<CreateProductDTO>(data);
	// console.log(payload);
	const result = await xata.db.product.create({
		author: 'rec_cpc49q6otdb9928vhhi0',
		brand: 'rec_cpc4clmotdb9928vhhog',
		title: payload.title,
		thumbnail: {
			mediaType: 'image/png',
			base64Content: payload.thumbnail,
			signedUrlTimeout: 3600,
		},
		data: JSON.parse(payload.data),
	});

	console.log(`Created product with ID: ${result.id}`);

	return { success: true };
};
