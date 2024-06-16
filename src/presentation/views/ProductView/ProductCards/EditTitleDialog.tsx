'use client';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
} from '@components/ui';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PencilIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const EditTitleDialog = ({
	initialValue = '',
}: {
	initialValue?: string;
}) => {
	const { state: isOpen, open, close, set: setOpen } = useDisclosure();
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
				<Button variant="outline" size="xs" className="flex gap-1">
					<PencilIcon size={16} />
					<span>{'Change title'}</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{`Change title for ${product.title}`}</DialogTitle>
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
					<Button
						type="submit"
						disabled={status !== 'idle' || title === initialValue}
						onClick={handleSave}
					>
						{status === 'idle'
							? 'Save changes'
							: status === 'pending'
							? 'Saving...'
							: 'Saved!'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
