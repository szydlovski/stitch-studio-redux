'use client';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useCallback, useEffect, useState } from 'react';
import { useProductContext } from '../components/ProductContext';
import { renderStitchFairyCovers } from './templateRendering';
import { TrashIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CoversCard = () => {
	const { pattern } = useProductContext();
	const [srcs, setSrcs] = useState<string[]>();
	const [renders, setRenders] = useState<HTMLCanvasElement[]>();
	const defaultColor = pattern.groups[0].hex;
	const generateCovers = useCallback(async () => {
		setRenders(
			await renderStitchFairyCovers({
				pattern,
				fabricColor: defaultColor,
				pinterestBarColor: defaultColor,
				frameColor: defaultColor,
				flossColor1: pattern.groups[1].hex ?? defaultColor,
				flossColor2: pattern.groups[2].hex ?? defaultColor,
				flossColor3: pattern.groups[3].hex ?? defaultColor,
				flossColor4: pattern.groups[4].hex ?? defaultColor,
				flossColor5: pattern.groups[5].hex ?? defaultColor,
			})
		);
	}, [pattern, defaultColor]);
	useEffect(
		() =>
			renders && setSrcs(renders.map((render): string => render.toDataURL())),
		[renders]
	);
	return (
		<Card>
			<CardHeader>
				<CardTitle>{'Covers'}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<Dialog>
					<DialogTrigger asChild>
						<Button>{'Cover Generator'}</Button>
					</DialogTrigger>
					<DialogContent className="flex flex-col w-full max-w-4xl overflow-auto">
						<DialogHeader>
							<DialogTitle className="flex gap-4 items-center">
								<span>Product Cover Generator</span>
								<Button variant="outline" size="xs" onClick={generateCovers}>
									{'Generate'}
								</Button>
							</DialogTitle>
							<DialogDescription>
								{`Click the Start button to start generating covers. You can select the covers you want to use in your product.`}
							</DialogDescription>
						</DialogHeader>
						<ScrollArea className="pr-4">
							<div className="w-full max-w-full flex-1 max-h-[410px]">
								<div className="grid grid-cols-4 gap-4 h-full">
									{srcs?.map((src, i) => (
										<div
											key={i}
											className="relative group flex items-center justify-center bg-muted rounded-md border aspect-square"
										>
											<div className="absolute bottom-0 left-0 w-full flex p-2">
												<Checkbox className="w-8 h-8 bg-muted" checked />
											</div>
											<img
												src={src}
												className="max-h-full"
												alt={'Generated cover'}
											/>
										</div>
									))}
								</div>
							</div>
						</ScrollArea>
						<DialogFooter>
							<Button type="submit" disabled>
								Save covers
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
};
