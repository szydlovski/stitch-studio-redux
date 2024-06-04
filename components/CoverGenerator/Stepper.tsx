'use client';
import { cn } from '@/lib';
import { CheckIcon } from 'lucide-react';

export const Stepper = <T extends string>({
	value,
	steps,
	onStepClick,
}: {
	value: T;
	steps: {
		key: T;
		title: string;
		description?: string;
	}[];
	onStepClick?: (key: T) => void;
}) => {
	return (
		<ol className="flex flex-col items-center w-full gap-4 sm:flex sm:space-y-0">
			{steps.map((step, i) => {
				const isCompleted = steps.findIndex((s) => s.key === value) > i;
				const { key, title } = step;
				return (
					<li
						key={key}
						className={cn(
							'flex w-full items-center gap-4 min-w-56 cursor-pointer',
							{
								'text-foreground/40': key !== value,
								'text-foreground': key === value,
							}
						)}
						onClick={() => onStepClick?.(key)}
					>
						<span
							className={cn(
								'flex items-center justify-center w-8 h-8 border rounded-full shrink-0',
								{
									'border-foreground bg-foreground text-background':
										key === value,
									'border-foreground/40 text-foreground/80': key !== value,
									// 'border-none bg-foreground/40 text-background/40':
									// 	isCompleted,
								}
							)}
						>
							{isCompleted ? <CheckIcon size={16} />: <span>{i + 1}</span>}
						</span>
						<span>
							<h3 className="font-medium leading-tight whitespace-nowrap">
								{title}
							</h3>
						</span>
					</li>
				);
			})}
		</ol>
	);
};
