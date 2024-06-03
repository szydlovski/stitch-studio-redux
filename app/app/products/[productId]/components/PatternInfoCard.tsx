'use client';
import { DataSet } from '@/components/DataSet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useProductContext } from '../components/ProductContext';
import { EditTitleDialog } from './EditTitleDialog';

export const MainCard = () => {
	const { product, pattern } = useProductContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex gap-4 items-center">
					<span>{product.title}</span>
					<div>
						<EditTitleDialog initialValue={product.title} />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2">
				<div className="flex flex-col gap-6">
					<DataSet label="Author">
						{product.author?.name ?? product.author?.email}
					</DataSet>
					<DataSet label="Brand">{product.brand?.name}</DataSet>
					<DataSet label="Created at">
						{/* {product.xata.createdAt.toLocaleString()} */}
					</DataSet>
					<DataSet label="Updated at">
						{/* {product.xata.updatedAt.toLocaleString()} */}
					</DataSet>
					<DataSet label="Dimensions">{pattern.dimensionsText}</DataSet>
					<DataSet label="Stitches">{pattern.stitchCount}</DataSet>
					<DataSet label="Colors">{pattern.colorCount}</DataSet>
				</div>
				<div className="w-full h-full">
					<div className="aspect-square bg-neutral-200 flex justify-center items-center p-4 max-h-[400px] ml-auto">
						<img src={product.thumbnail.src} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
