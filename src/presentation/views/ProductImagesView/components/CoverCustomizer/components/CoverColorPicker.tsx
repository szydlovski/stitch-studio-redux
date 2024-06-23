'use client';
import { Button } from '@components/ui';
import { cn } from '@lib/utils';
import { CSSProperties } from 'react';

export const CoverColorPicker = ({
	color,
	className,
	style,
	onClick,
	active,
}: {
	color: string;
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
	active?: boolean;
}) => {
	return (
		<div className={cn('absolute', className)} style={style}>
			{active && (
				<div
					className={
						'w-6 h-6 p-0 rounded-full bg-background transition-all top-0 left-0 absolute origin-center scale-[130%] animate-ping anim'
					}
				/>
			)}
			<Button
				className={cn(
					'w-6 h-6 p-0 rounded-full border-background border-2 shadow-md shadow-foreground/40 transition-all relative origin-center',
					{
						'scale-[135%]': active,
						'hover:scale-[115%]': !active,
					}
				)}
				style={{ backgroundColor: color, transformOrigin: 'center' }}
				onClick={onClick}
			/>
		</div>
	);
};
