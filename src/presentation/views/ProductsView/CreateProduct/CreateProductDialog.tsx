'use client';
import { listProductQueryKey, useCreateProduct } from '@application/product';
import { CrossStitchPattern } from '@domain/cross-stitch';
import {
	CrossStitchPatternRenderer,
	loadStitchTextureDictionary,
} from '@infrastructure/cross-stitch';
import { CrossStitchPatternParser } from '@infrastructure/cross-stitch/CrossStitchPatternParser';
import { selectFile } from '@presentation/utils';
import { DataSet } from '@components/DataSet';
import {
	Input,
	Label,
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useCallback, useState } from 'react';
import Image from 'next/image';

export interface FilePatternPayload {
	pattern: CrossStitchPattern;
	src: string;
	filename: string;
	width: number;
	height: number;
}

const formatPayload = async (file: File): Promise<FilePatternPayload> => {
	const pattern = await CrossStitchPatternParser.parseImageFile(file);
	const textures = await loadStitchTextureDictionary();
	const renderer = new CrossStitchPatternRenderer(textures);
	const img = renderer.renderEmbroideryMockup(pattern, 4);
	const dataUrl = img.toDataURL();

	return {
		width: img.width,
		height: img.height,
		pattern,
		src: dataUrl,
		filename: file.name,
	};
};

const dataUrlToXataBase64 = (dataUrl: string) => {
	return dataUrl.split(',')[1];
};

export const CreateProductDialogContent = ({
	state,
	setState,
	success,
	onSuccess,
}: {
	state?: FilePatternPayload;
	setState: (state?: FilePatternPayload) => void;
	success: boolean;
	onSuccess?: () => void;
}) => {
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');
	const handlePickFile = useCallback(async () => {
		setState(undefined);
		const file = await selectFile();
		setState(await formatPayload(file));
	}, [setState]);
	const { mutateAsync } = useCreateProduct();
	const handleSave = async () => {
		if (!state) return;
		const product = await mutateAsync({
			title,
			thumbnail: dataUrlToXataBase64(state.src),
			data: JSON.stringify(state.pattern.toData()),
		});

		await queryClient.invalidateQueries({ queryKey: listProductQueryKey() });
		onSuccess?.();
	};
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Create product</DialogTitle>
				<DialogDescription>
					{success
						? 'Product created successfully!'
						: `Select a .PNG image to get started.`}
				</DialogDescription>
			</DialogHeader>
			{!success && (
				<>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								File
							</Label>
							<Button
								variant="outline"
								className="col-span-3"
								onClick={handlePickFile}
							>
								{state ? state.filename : 'Select file'}
							</Button>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								id="title"
								placeholder="My new product"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="col-span-3"
							/>
						</div>
					</div>
					<div className="flex p-4 justify-center items-center aspect-square bg-neutral-100 rounded-md">
						{state ? (
							<Image
								src={state.src}
								width={state.width}
								height={state.height}
								alt="Preview"
							/>
						) : (
							<span className="text-sm text-neutral-400">
								Preview will appear here.
							</span>
						)}
					</div>
					<div className="grid grid-cols-3 gap-6">
						<DataSet label={'Dimensions'}>
							{state?.pattern.dimensionsText}
						</DataSet>
						<DataSet label={'Stitches'}>{state?.pattern.stitchCount}</DataSet>
						<DataSet label={'Colors'}>{state?.pattern.colorCount}</DataSet>
					</div>
				</>
			)}
			<DialogFooter>
				<Button type="submit" disabled={!state || success} onClick={handleSave}>
					Save
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export const CreateProductDialog = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<FilePatternPayload>();
	const [success, setSuccess] = useState(false);
	return (
		<Dialog
			onOpenChange={() => {
				if (success) {
					setSuccess(false);
				} else {
					setState(undefined);
				}
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<CreateProductDialogContent
				state={state}
				setState={setState}
				success={success}
				onSuccess={() => setSuccess(true)}
			/>
		</Dialog>
	);
};
