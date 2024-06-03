'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useProductContext } from '../components/ProductContext';

export const PaletteCard = () => {
	const { pattern } = useProductContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle>{'Palette'}</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2">
				{pattern.groups.map((color) => (
					<div key={color.hex} className="">
						<div
							className="h-10 rounded-sm border"
							style={{ backgroundColor: color.hex }}
						/>
						<div className="text-sm">{color.hex}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
