'use client';
import { DataSet } from '@components/DataSet';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@components/ui';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import Image from 'next/image';
import { EditTitleDialog } from './EditTitleDialog';

export const PatternCard = () => {
	const { product, pattern } = useProductContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<span>{'About this pattern'}</span>
					<div className="ml-auto">
						<EditTitleDialog initialValue={product.title} />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2">
				<div className="flex flex-col gap-6">
					<DataSet label="Created at">
						{/* {product.xata.createdAt.toLocaleString()} */}
					</DataSet>
					<DataSet label="Updated at">
						{/* {product.xata.updatedAt.toLocaleString()} */}
					</DataSet>
					<DataSet label="Dimensions">{pattern.dimensionsText}</DataSet>
					<DataSet label="Stitches">{pattern.stitchCount}</DataSet>
					<DataSet label="Colors">{pattern.colorCount}</DataSet>
					<DataSet label="Palette">
						<div className="flex gap-1">
							{pattern.groups.map(({ hex }, i) => (
								<Tooltip key={i}>
									<TooltipTrigger asChild>
										<div
											className="h-6 w-6 rounded-sm border"
											style={{ backgroundColor: hex }}
										/>
									</TooltipTrigger>
									<TooltipContent side="bottom">{hex}</TooltipContent>
								</Tooltip>
							))}
						</div>
					</DataSet>
				</div>
				<div className="w-full h-full">
					<div className="aspect-square bg-neutral-200 flex justify-center items-center p-4 max-h-[400px] ml-auto">
						<Image
							width={product.thumbnail.width}
							height={product.thumbnail.height}
							alt={product.title}
							src={product.thumbnail.src}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
