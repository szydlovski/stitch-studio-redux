'use client';
import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import { DataSet } from '@/components/DataSet';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Input,
} from '@/components/ui';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pattern } from '@/lib/pattern/pattern';
import { getXataClient } from '@/lib/xata';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useProductContext } from './ProductContext';
import { useDisclosure } from '@/lib/hooks/useDisclosure';

export const EditTitleDialog = ({
	initialValue = '',
}: {
	initialValue?: string;
}) => {
	const { isOpen, open, close, set: setOpen } = useDisclosure();
	const queryClient = useQueryClient();
	const { product } = useProductContext();
	const [title, setTitle] = useState(initialValue);
	const { status, mutateAsync, reset } = useMutation({
		mutationKey: ['updateProductTitle', product.id, title],
		mutationFn: ({ title }: { title: string }) =>
			fetch(`/api/products/${product.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ title }),
			}),
	});
	const handleSave = async () => {
		await mutateAsync({ title });
		await queryClient.invalidateQueries({ queryKey: ['product', product.id] });
		close();
	};

	useEffect(() => {
		setTitle(initialValue);
		reset();
	}, [isOpen, initialValue, reset]);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit product title</DialogTitle>
					<DialogDescription>
						{`Make changes to your profile here. Click save when you're done.`}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="col-span-3"
						disabled={status !== 'idle'}
					/>
				</div>
				<DialogFooter>
					<Button type="submit" disabled={status !== 'idle' || title === initialValue} onClick={handleSave}>
						{status === 'idle' ? 'Save changes' : status === 'pending' ? 'Saving...' : 'Saved!'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
