'use client';
import { CoverGeneratorDialog } from '@/application/product/CoverGenerator/CoverGeneratorDialog';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/presentation/components/ui';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/presentation/components/ui/popover';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import { useQuery } from '@tanstack/react-query';
import { HexColorPicker } from 'react-colorful';
import { useProductContext } from '@/presentation/components/context/ProductContext';

export const CoverColorPicker = ({
	color,
	onChange,
}: {
	color: string;
	onChange: (color: string) => void;
}) => {
	const { pattern } = useProductContext();
	const { state: isOpen, open, close, set: setOpen } = useDisclosure();
	return (
		<Popover open={isOpen} onOpenChange={setOpen}>
			<PopoverTrigger>
				<Button
					className="w-10 rounded-full"
					style={{ backgroundColor: color }}
				/>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-4xl">
				<HexColorPicker
					style={{ width: '100%' }}
					color={color}
					onChange={() => onChange(color)}
				/>
				<div className="p-2 grid grid-cols-6 gap-2 mt-0">
					{pattern.groups.map((color, i) => (
						<Button
							className="w-full rounded-full"
							style={{ backgroundColor: color.hex }}
							onClick={() => onChange(color.hex)}
						/>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

interface ProductImageItem {
	id: string;
	key: string;
	src: string;
	width: number;
	height: number;
	attributes: any;
}

export const CoversCard = () => {
	const { product } = useProductContext();
	const { data: images } = useQuery({
		queryKey: ['covers', product.id],
		queryFn: () =>
			fetch(`/api/products/${product.id}/images`).then(
				(res) => res.json() as Promise<{ images: ProductImageItem[] }>
			),
		select: (data) => data.images,
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<span>{'Covers'}</span>
					<div className="ml-auto">
						<CoverGeneratorDialog />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-4">
					{images?.map(({ src }, i) => (
						<div
							key={i}
							className="h-full aspect-square border rounded-md flex justify-center items-center"
						>
							<img className="max-h-full max-w-full" src={src} />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
