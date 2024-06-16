import { StitchFairyCoPdf } from '@/brand/StitchFairyCo/pdf/StitchFairyCoPdf';
import { ProductDetails } from '@/domain/product/ProductDetails';
import { GetProductQuery } from '@/infrastructure/product/query/GetProductQuery';
import { Metadata } from 'next';

type PageProps = {
	searchParams: {
		productId: string;
	};
};

export async function generateMetadata({
	searchParams: { productId },
}: PageProps): Promise<Metadata> {
	if (!productId) throw new Error('');
	const attrs = await new GetProductQuery().execute(productId);
	const product = ProductDetails.fromAttributes(attrs);
	return {
		title: product.title,
	};
}

export default async function Page({
	searchParams: { productId },
}: {
	searchParams: {
		productId: string;
	};
}) {
	if (!productId) {
		return <div>Error, no product provided</div>;
	}
	const attrs = await new GetProductQuery().execute(productId);
	const product = ProductDetails.fromAttributes(attrs);
	return (
		<div className='flex flex-col items-center gap-24 print:gap-0 p-24 print:p-0 bg-neutral-900 print:bg-transparent'>
			<StitchFairyCoPdf product={product} />
		</div>
	);
}