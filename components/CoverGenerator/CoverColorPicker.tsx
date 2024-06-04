'use client';
import { Button } from '@/components/ui';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import { CSSProperties } from 'react';
import { HexColorPicker } from 'react-colorful';

export const CoverColorPicker = ({
	color,
	onChange,
	palette,
	className,
	style,
}: {
	color: string;
	onChange: (color: string) => void;
	palette?: string[];
	className?: string;
	style?: CSSProperties;
}) => {
	const { state: isOpen, set: setOpen } = useDisclosure();
	return (
		<div className={cn('absolute', className)} style={style}>
			<Popover open={isOpen} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						className="w-6 h-6 p-0 rounded-full border-background border-2 shadow-md shadow-foreground/40"
						style={{ backgroundColor: color }}
					/>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-4xl">
					<HexColorPicker
						style={{ width: '100%' }}
						color={color}
						onChange={(newColor) => onChange(newColor)}
					/>
					{palette && (
						<div className="p-2 grid grid-cols-6 gap-2 mt-0">
							{palette.map((color, i) => (
								<Button
									key={i}
									className="w-full rounded-full border-background border-2 shadow-md shadow-foreground/40"
									style={{ backgroundColor: color }}
									onClick={() => onChange(color)}
								/>
							))}
						</div>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
};
