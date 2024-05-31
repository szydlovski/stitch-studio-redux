'use server';
import { auth } from '@/config/auth';
import { getXataClient } from '@/lib/xata';
import z from 'zod';

const createProductSchema = z.object({
	title: z.string(),
	thumbnail: z.string(),
	data: z.string(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

const parseFormData = <T>(data: FormData): T =>
	Object.fromEntries(data.entries()) as T;

export const createProduct = async (data: FormData) => {
	const xata = getXataClient();
	const session = await auth();
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

	return { success: true };
};
