'use client';
import { DropdownMenu } from '@components/DropdownMenu';
import { Button } from '@components/ui';
import { FlossColor } from '@domain/cross-stitch';
import { cn } from '@lib/utils';
import { EllipsisIcon, PaletteIcon } from 'lucide-react';

export const ColorItem = ({
	color: { id, name, color, palette, symbol },
	isActive,
	onClick,
	onReplace,
}: {
	color: FlossColor;
	isActive: boolean;
	onClick: VoidFunction;
	onReplace: VoidFunction;
}) => {
	return (
		<>
			<div className={cn('px-2 bg-muted', isActive && 'bg-background')}>
				<div
					key={id}
					className={'flex items-center gap-2 p-2 rounded-lg group'}
				>
					<button
						className={cn('w-8 h-8 rounded-md transition-transform', {
							'hover:scale-105': !isActive,
							'ring-2 ring-blue-500': isActive,
						})}
						style={{ backgroundColor: color }}
						onClick={onClick}
					/>
					<div className="flex flex-col text-left">
						<span className="text-sm font-semibold leading-3">{name}</span>
						<span className="text-xs text-foreground/60">
							Palette: {palette}
						</span>
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
									onClick: onReplace,
								},
							]}
						>
							<Button variant="ghost" size="icon-xs">
								<EllipsisIcon size={16} />
							</Button>
						</DropdownMenu>
					</div>
				</div>
			</div>
			{isActive && (
				<div className="text-xs bg-accent p-2 shadow-inner">
					<div>id: {id}</div>
					<div>name: {name}</div>
					<div>palette: {palette}</div>
					<div>symbol: {symbol}</div>
				</div>
			)}
		</>
	);
};
