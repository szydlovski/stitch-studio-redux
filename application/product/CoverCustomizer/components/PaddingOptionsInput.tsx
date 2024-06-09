import { Button, Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { PaddingOptions } from '../../CoverGenerator/types';

const SCALE_STEP = 0.001;

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
	onValueChange: updateOptions,
}: {
	value: PaddingOptions;
	onValueChange: (options: Partial<PaddingOptions>) => void;
}) => {
	return (
		<div className="grid grid-cols-2 gap-4 p-4">
			<div className="flex flex-col gap-2 col-span-2">
				<Label>{'Scale'}</Label>
				<div className="flex gap-2">
					<Button
						variant="ghost"
						size="xs"
						onClick={() => updateOptions({ scale: scale - SCALE_STEP * 20 })}
					>
						<MinusIcon size={12} />
					</Button>
					<Slider
						value={[scale]}
						max={1}
						step={SCALE_STEP}
						onValueChange={([value]) => updateOptions({ scale: value })}
					/>
					<Button
						variant="ghost"
						size="xs"
						onClick={() => updateOptions({ scale: scale + SCALE_STEP * 20 })}
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
