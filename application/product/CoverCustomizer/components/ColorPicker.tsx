import { ScrollArea } from '@/components/ui/scroll-area';
import { HexColorPicker } from 'react-colorful';

export const ColorPicker = ({
	value,
	onChange,
	palette = [],
}: {
	value: string;
	onChange?: (value: string) => void;
	palette?: string[];
}) => {
	return (
		<div className="flex flex-1">
			<HexColorPicker className="flex-1" color={value} onChange={onChange} />
			<ScrollArea className="flex-[0.8] h-full">
				<div className="p-2 flex flex-wrap justify-start items-start content-start gap-1.5 mt-0">
					{palette.map((color, i) => (
						<div
							key={i}
							className="h-7 w-7 rounded-sm cursor-pointer border"
							style={{ backgroundColor: color }}
							onClick={() => onChange?.(color)}
						/>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export const ColorPickerPlaceholer = () => (
	<div className="h-full flex bg-muted justify-center items-center">
		<span className="text-sm text-foreground/25 font-semibold">
			No color selected.
		</span>
	</div>
);
