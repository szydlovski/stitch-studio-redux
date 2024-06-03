'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useProductContext } from './ProductContext';

export const ProductFilesCard = () => {
	const { pattern } = useProductContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle>{'Product Files'}</CardTitle>
			</CardHeader>
			<CardContent>NYI</CardContent>
		</Card>
	);
};
