'use client';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { TrashIcon } from 'lucide-react';
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
} from '@/components/ui/alert-dialog';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProductApiClient } from '@/context/product/infrastructure/ProductApiClient';
import { useProductContext } from '@/components/context/ProductContext';

export const DangerZoneCard = () => {
	const { product } = useProductContext();
	const router = useRouter();
	const { status, mutateAsync } = useMutation({
		mutationKey: ['deleteProduct', product.id],
		mutationFn: () => new ProductApiClient().delete(product.id),
	});
	const handleDelete = useCallback(async () => {
		await mutateAsync();
		router.push('/app/products');
	}, [mutateAsync, router]);
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
