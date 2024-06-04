import { getXataClient } from '@/lib/xata';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {
	const images = await getXataClient()
		.db.productImage.select(['*', 'image.signedUrl']).filter({
			product: productId,
		})
		.getAll()
		.then((images) =>
			images.map(({ id, image, attributes, key }) => ({
				id,
				key,
				attributes,
				src: image?.signedUrl ?? '',
				width: image?.attributes?.width,
				height: image?.attributes?.height,
			}))
		);
	return NextResponse.json({ images });
}

export async function POST(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {
	const parsedBody = await req.json();
	const result = await getXataClient().db.productImage.create({
		product: productId,
		key: parsedBody.key,
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
