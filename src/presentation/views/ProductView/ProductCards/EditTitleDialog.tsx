'use client';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@components/ui';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PencilIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const useKeyPress = (key: string, callback: () => void) => {
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === key) {
				callback();
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [callback, key]);
};

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

	// useKeyPress('Escape', close);
	useKeyPress('Enter', () => title !== initialValue && handleSave());

	useEffect(() => {
		setTitle(initialValue);
		reset();
	}, [isOpen, initialValue, reset]);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<Tooltip delayDuration={0}>
				<DialogTrigger asChild>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon-xs">
							<PencilIcon size={12} />
						</Button>
					</TooltipTrigger>
				</DialogTrigger>
				<TooltipContent>Change title</TooltipContent>
			</Tooltip>
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
							? 'Save'
							: status === 'pending'
							? 'Saving...'
							: 'Saved!'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
