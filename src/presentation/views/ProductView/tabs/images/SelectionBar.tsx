'use client';
import { cn } from '@lib/utils';
import { Button } from '@components/ui';

interface SelectionBarProps {
	selectedCount: number;
	onUnselect: () => void;
	onDelete: () => void;
}

export const SelectionBar = ({
	selectedCount,
	onUnselect,
	onDelete,
}: SelectionBarProps) => {
	return (
		<div
			className={cn(
				'absolute w-full flex justify-center bottom-[25px] p-6 opacity-0 pointer-events-none transition-all',
				{
					'opacity-100 pointer-events-auto': selectedCount > 0,
				}
			)}
		>
			<div className="bg-background rounded-full px-12 pl-8 py-4 shadow-2xl flex flex-col">
				<div className="flex gap-2 items-center">
					<span className="mr-4 font-semibold text-sm">
						<span className="inline-block w-6 text-right">{selectedCount}</span>
						<span> images selected</span>
					</span>
					<Button onClick={onUnselect}>Unselect</Button>
					<Button onClick={onDelete} variant="destructive" disabled>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};
