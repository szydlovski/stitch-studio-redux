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
import { CSSProperties, useEffect, useState } from 'react';
import { renderStitchFairyMainCover } from '../../../lib/templateRendering';
import { CoverColorPicker } from '../CoverColorPicker';
import { useCoverGeneratorContext } from '../CoverGeneratorContext';
import { ColorKey, CoverGeneratorActions } from '../reducer';
import { PaddingOptionsInput } from './PaddingOptionsInput';

type CoverColorPickerConfig = {
	style: CSSProperties;
	key: ColorKey;
	palette?: string[];
};
const coverColorPickerConfigs: CoverColorPickerConfig[] = [
	{
		style: { top: '22%', right: '25%' },
		key: 'background',
		palette: ['#242424', '#fefefe'],
	},
	{ style: { top: '56%', right: '5%' }, key: 'fabric' },
	{ style: { top: '67%', left: '3%' }, key: 'floss1' },
	{ style: { top: '72%', left: '7%' }, key: 'floss2' },
	{ style: { top: '78%', left: '10%' }, key: 'floss3' },
	{ style: { top: '84%', left: '12%' }, key: 'floss4' },
	{ style: { top: '90%', left: '14%' }, key: 'floss5' },
];

export const Step2AdjustColors = () => {
	const {
		pattern,
		state,
		dispatch,
		resetState,
		stepper: { hasNext, nextStep },
	} = useCoverGeneratorContext();
	const { scale, xOffset, yOffset } = state.paddingOptions;
	const [previewSrc, setPreviewSrc] = useState<string>();
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
	const patternPalette = pattern.groups.map((color) => color.hex);

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
							{coverColorPickerConfigs.map(({ style, palette, key }) => (
								<CoverColorPicker
									key={key}
									style={style}
									palette={
										palette ? [...palette, ...patternPalette] : patternPalette
									}
									color={state.colors[key]}
									onChange={(color) =>
										dispatch(
											CoverGeneratorActions.setColor({
												key,
												value: color,
											})
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
					<div className="border rounded-md p-4">{'NYI'}</div>
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
