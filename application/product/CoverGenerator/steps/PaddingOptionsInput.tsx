'use client';
import { Button, Input } from '@/components/ui';
import { Slider } from '@/components/ui/slider';
import { getSquarePadding } from '@/lib/helpers';
import { Pattern } from '@/lib/pattern/pattern';
import { Padding } from '@/lib/pattern/types';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';
import { Label } from '@/components/ui/label';
import { PaddingOptions } from '../types';
import { MinusIcon, PlusIcon } from 'lucide-react';

const adjustScale = (value: number) => -0.5 + (1 - value) * 2;

const STEP = 0.01;

const getPaddingFromOptions = (
	pattern: Pattern,
	{ scale, xOffset, yOffset }: PaddingOptions
): Padding => {
	let padding = getSquarePadding(pattern, adjustScale(scale));
	if (xOffset !== 0) {
		padding.left += xOffset;
		padding.right -= xOffset;
	}
	if (yOffset !== 0) {
		padding.top += yOffset;
		padding.bottom -= yOffset;
	}
	return padding;
};

const OffsetInput = ({
	label,
	value,
	onValueChange,
}: {
	label: string;
	value: number;
	onValueChange: (value: number) => void;
}) => {
	return (
		<div className="flex flex-col gap-2">
			<Label>{label}</Label>
			<div className="flex flex-col">
				<Input
					type="number"
					step={1}
					value={value}
					className="rounded-b-none"
					onChange={(evt) => onValueChange(Number(evt.target.value))}
				/>
				<div className="flex">
					<Button
						variant="outline"
						className="py-0 px-0 flex-1 h-8 rounded-t-none rounded-r-none"
						onClick={() => onValueChange(value - 1)}
					>
						<MinusIcon size={12} />
					</Button>
					<Button
						variant="outline"
						className="py-0 px-0 flex-1 h-8 rounded-t-none rounded-l-none"
						onClick={() => onValueChange(value + 1)}
					>
						<PlusIcon size={12} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export const PaddingOptionsInput = ({
	value: { scale, xOffset, yOffset },
	pattern,
	initialScale,
	setPadding,
	updateOptions,
}: {
	value: PaddingOptions;
	pattern: Pattern;
	initialScale: number;
	setPadding: (padding: Padding) => void;
	updateOptions: (options: Partial<PaddingOptions>) => void;
}) => {
	const [localScale, setLocalScale] = useState(initialScale);

	const debouncedUpdateOptions = useMemo(
		() => debounce(updateOptions, 50),
		[updateOptions]
	);

	useEffect(() => {
		setPadding(getPaddingFromOptions(pattern, { scale, xOffset, yOffset }));
	}, [scale, xOffset, yOffset]);

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="flex flex-col gap-2 col-span-2">
				<Label>{'Zoom'}</Label>
				<div className="flex gap-2">
					<Button
						variant='ghost'
						size='xs'
						onClick={() => {
							const newScale = localScale - STEP;
							setLocalScale(newScale);
							debouncedUpdateOptions({ scale: newScale });
						}}
					>
						<MinusIcon size={12} />
					</Button>
					<Slider
						value={[localScale]}
						max={1}
						step={STEP}
						onValueChange={([value]) => {
							setLocalScale(value);
							debouncedUpdateOptions({ scale: value });
						}}
					/>
					<Button
						variant='ghost'
						size='xs'
						onClick={() => {
							const newScale = localScale + STEP;
							setLocalScale(newScale);
							debouncedUpdateOptions({ scale: newScale });
						}}
					>
						<PlusIcon size={12} />
					</Button>
				</div>
			</div>
			<OffsetInput
				label="X Offset"
				value={xOffset}
				onValueChange={(value) => updateOptions({ xOffset: value })}
			/>
			<OffsetInput
				label="Y Offset"
				value={yOffset}
				onValueChange={(value) => updateOptions({ yOffset: value })}
			/>
		</div>
	);
};
