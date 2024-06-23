import { GetProductImagesQuery } from '@infrastructure/product/GetProductImagesQuery';
import { routeHandler } from '@lib/api/routeHandler';
import { getXataClient } from '@lib/xata';
import { NextRequest, NextResponse } from 'next/server';

export const GET = routeHandler<{ productId: string }>(async ({ params: { productId } }) => {
	const images = await new GetProductImagesQuery().execute(productId);
	return NextResponse.json({ images });
});

export async function POST(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {
	const parsedBody = await req.json();
	const result = await getXataClient().db.productImage.create({
		product: productId,
		tags: [parsedBody.key],
		image: {
			mediaType: 'image/png',
			base64Content: parsedBody.image,
			signedUrlTimeout: 3600,
		},
	});
	if (!result)
		return NextResponse.json(
			{ error: true, message: 'Failed to upload image' },
			{ status: 500 }
		);
	const { id } = result;
	return NextResponse.json({ id });
}
