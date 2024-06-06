'use client';
import { Button } from '@/components/ui';
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib';
import {
	CSSProperties,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { renderStitchFairyMainCover } from '@/lib/templateRendering';
import { CoverColorPicker } from '../CoverColorPicker';
import { useCoverGeneratorContext } from '../CoverGeneratorContext';
import { ColorKey, CoverGeneratorActions } from '../reducer';
import { PaddingOptionsInput } from './PaddingOptionsInput';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { ScrollArea } from '@/components/ui/scroll-area';

type CoverColorPickerConfig = {
	style: CSSProperties;
	key: ColorKey;
	palette?: string[];
	side?: 'top' | 'right' | 'bottom' | 'left';
};
const coverColorPickerConfigs: CoverColorPickerConfig[] = [
	{
		style: { top: '23%', left: '73%' },
		key: 'background',
		palette: ['#242424', '#fefefe'],
		side: 'top',
	},
	{ style: { top: '57%', left: '92%' }, side: 'top', key: 'fabric' },
	{ style: { top: '68%', left: '4%' }, side: 'left', key: 'floss1' },
	{ style: { top: '73%', left: '8%' }, side: 'left', key: 'floss2' },
	{ style: { top: '79%', left: '11%' }, side: 'left', key: 'floss3' },
	{ style: { top: '85%', left: '13%' }, side: 'left', key: 'floss4' },
	{ style: { top: '91%', left: '15%' }, side: 'bottom', key: 'floss5' },
];

export const Step2AdjustColors = () => {
	const {
		pattern,
		state,
		dispatch,
		resetState,
		stepper: { hasNext, nextStep },
		activeColorKey,
		setActiveColorKey,
	} = useCoverGeneratorContext();

	const palette = useMemo(
		() => [
			...(coverColorPickerConfigs.find(({ key }) => key === activeColorKey)
				?.palette ?? []),
			...pattern.groups.map((color) => color.hex),
		],
		[activeColorKey]
	);
	const { scale, xOffset, yOffset } = state.paddingOptions;
	const [previewSrc, setPreviewSrc] = useState<string>();
	const updateActiveColor = useCallback(
		(color: string) => {
			if (activeColorKey) {
				dispatch(
					CoverGeneratorActions.setColor({
						key: activeColorKey,
						value: color,
					})
				);
			}
		},
		[activeColorKey]
	);
	useEffect(() => {
		renderStitchFairyMainCover({
			pattern,
			padding: state.padding,
			backgroundColor: state.colors.background,
			fabricColor: state.colors.fabric,
			flossColor1: state.colors.floss1,
			flossColor2: state.colors.floss2,
			flossColor3: state.colors.floss3,
			flossColor4: state.colors.floss4,
			flossColor5: state.colors.floss5,
		}).then((render) => setPreviewSrc(render.toDataURL()));
	}, [pattern, state.padding, state.colors]);

	return (
		<>
			<DialogHeader className="mb-6">
				<DialogTitle className="flex gap-4 items-center">
					{'Customize your cover'}
				</DialogTitle>
				<DialogDescription>
					{`Select colors and padding options.`}
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4">
				<div className="relative">
					{previewSrc ? (
						<>
							<img
								src={previewSrc}
								alt="Preview"
								className="w-full rounded-md border"
							/>
							{coverColorPickerConfigs.map(({ style, key }) => (
								<CoverColorPicker
									active={activeColorKey === key}
									key={key}
									style={style}
									color={state.colors[key]}
									onClick={() =>
										setActiveColorKey((prev) =>
											prev === key ? undefined : key
										)
									}
								/>
							))}
						</>
					) : (
						<Skeleton className="w-full aspect-[686/545] rounded-md border" />
					)}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="border rounded-md p-4">
						<PaddingOptionsInput
							pattern={pattern}
							value={{ scale, xOffset, yOffset }}
							initialScale={0.5}
							setPadding={(padding) =>
								dispatch(CoverGeneratorActions.setPadding(padding))
							}
							updateOptions={(options) =>
								dispatch(CoverGeneratorActions.setPaddingOptions(options))
							}
						/>
					</div>
					<div className="flex border rounded-md bg-muted h-[200px]">
						{activeColorKey ? (
							<div className="flex flex-1">
								<HexColorPicker
									className="flex-1"
									color={state.colors[activeColorKey]}
									onChange={updateActiveColor}
								/>
								<ScrollArea className="flex-[0.8] h-full">
									<div className="p-2 flex flex-wrap justify-start items-start content-start gap-1.5 mt-0">
										{palette.map((color, i) => (
											<div
												key={i}
												className="h-7 w-7 rounded-sm cursor-pointer border"
												style={{ backgroundColor: color }}
												onClick={() => updateActiveColor(color)}
											/>
										))}
									</div>
								</ScrollArea>
							</div>
						) : (
							<div className="flex flex-1 justify-center items-center">
								<span className='text-sm text-foreground/25 font-semibold'>No color selected.</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<DialogFooter className="mt-6 flex">
				<Button
					type="submit"
					variant={'outline'}
					className="mr-auto"
					onClick={resetState}
				>
					Restore defaults
				</Button>
				<Button type="submit" disabled={!hasNext} onClick={nextStep}>
					Next
				</Button>
			</DialogFooter>
		</>
	);
};
