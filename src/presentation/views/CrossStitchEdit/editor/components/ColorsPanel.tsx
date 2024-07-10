'use client';
import { DropdownMenu } from '@components/DropdownMenu';
import { Button, ScrollArea } from '@components/ui';
import { FlossColor } from '@domain/cross-stitch';
import { cn } from '@lib/utils';
import { EllipsisIcon, PaletteIcon } from 'lucide-react';
import { useCrossStitchEditorContext } from '../CrossStitchEditorContext';
import { CrossStitchEditorActions } from '../crossStitchEditorReducer';

const ColorItem = ({
	color: { id, name, color, palette },
	isActive,
	onClick,
}: {
	color: FlossColor;
	isActive: boolean;
	onClick: VoidFunction;
}) => {
	return (
		<div
			key={id}
			className={cn('flex items-center gap-2 p-2 rounded-lg group', {
				'ring-2 ring-blue-500 ring-inset': isActive,
			})}
		>
			<button
				className="w-8 h-8 rounded-md hover:scale-105 transition-transform"
				style={{ backgroundColor: color }}
				onClick={onClick}
			/>
			<div className="flex flex-col text-left">
				<span className="text-sm font-semibold leading-3">{name}</span>
				<span className="text-xs text-foreground/60">Palette: {palette}</span>
			</div>
			<div className="flex items-center opacity-100 group-hover:opacity-100">
				<DropdownMenu
					items={[
						{
							type: 'label',
							label: name,
							variant: 'title',
						},
						{
							type: 'item',
							label: 'Replace...',
							icon: PaletteIcon,
						},
					]}
				>
					<Button variant="ghost" size="icon-xs">
						<EllipsisIcon size={16} />
					</Button>
				</DropdownMenu>
			</div>
		</div>
	);
};

export const ColorsPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="absolute top-0 right-0 bg-background border-b border-l rounded-bl-lg flex flex-col">
			<div>
				<ScrollArea className="h-[300px] w-[200px] border-b">
					<div className="flex flex-col p-2">
						{state.colors.map((color) => (
							<ColorItem
								key={color.id}
								color={color}
								isActive={state.activeColorId === color.id}
								onClick={() =>
									dispatch(CrossStitchEditorActions.setActiveColor(color.id))
								}
							/>
						))}
					</div>
				</ScrollArea>
				<div className="flex flex-col p-2">
					<Button variant="outline" size="sm">
						Add color...
					</Button>
				</div>
			</div>
		</div>
	);
};
