import { GetProductImagesQuery } from '@infrastructure/product/GetProductImagesQuery';
import { XataQuery } from '@lib/api/XataQuery';
import { routeHandler } from '@lib/api/routeHandler';
import { getXataClient } from '@lib/xata';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = routeHandler<{ productId: string }>(
	async ({ params: { productId } }) => {
		const images = await new GetProductImagesQuery().execute(productId);
		return NextResponse.json({ images });
	}
);

const CreateProductImageArgsSchema = z
	.object({
		imageBase64: z.string(),
		type: z.optional(z.enum(['png', 'jpeg'])),
		tags: z.optional(z.array(z.string())),
	})
	.strict();

interface CreateProductImageCommandArgs {
	imageBase64: string;
	type?: 'png' | 'jpeg';
	tags?: string[];
}

class CreateProductImageCommand extends XataQuery {
	async execute(
		productId: string,
		{ imageBase64, type = 'png', tags = [] }: CreateProductImageCommandArgs
	) {
		const result = await this.xata.db.productImage.create({
			product: productId,
			tags,
			image: {
				mediaType: `image/${type}`,
				base64Content: imageBase64,
				signedUrlTimeout: 3600,
			},
		});
		return result.toSerializable();
	}
}

export async function POST(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {
	const parsedBody = await req.json();
	const { success, error, data: args } = CreateProductImageArgsSchema.safeParse(parsedBody);
	if (!success)
		return NextResponse.json(
			{ error: true, message: 'Invalid request body', details: error },
			{ status: 400 }
		);
	const result = await new CreateProductImageCommand().execute(productId, args);
	if (!result)
		return NextResponse.json(
			{ error: true, message: 'Failed to upload image' },
			{ status: 500 }
		);
	const { id } = result;
	return NextResponse.json({ id });
}
