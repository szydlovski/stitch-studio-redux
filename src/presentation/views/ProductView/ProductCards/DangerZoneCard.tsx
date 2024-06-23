'use client';
import { useDeleteProduct } from '@application/product';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@components/ui';
import { useProductContext } from '../ProductContext';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { AppViews } from '@/app/routes';

export const DangerZoneCard = () => {
	const { product } = useProductContext();
	const router = useRouter();
	const { status, mutateAsync } = useDeleteProduct();
	const handleDelete = useCallback(async () => {
		await mutateAsync(product.id);
		router.push(AppViews.Products());
	}, [mutateAsync, router, product.id]);
	return (
		<Card>
			<CardHeader>
				<CardTitle>{'Danger Zone'}</CardTitle>
			</CardHeader>
			<CardContent>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="flex gap-2 bg-red-600 hover:bg-red-500">
							<TrashIcon size={18} />
							<span>{'Delete Product'}</span>
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to delete {product.title}?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action is irreversible. All data associated with this
								product will be permanently deleted.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								className="bg-red-600 hover:bg-red-500"
								onClick={handleDelete}
							>
								{status === 'idle' ? 'Delete' : 'Deleting...'}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	);
};
