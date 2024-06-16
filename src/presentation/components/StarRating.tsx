import { cn } from '@/lib';
import { StarIcon } from 'lucide-react';
import { CSSProperties } from 'react';

const VariableStar = ({
	value = 1,
	className,
	style,
}: {
	value?: number;
	className?: string;
	style?: CSSProperties;
}) => {
	const size = 20;
	const offset = size * value;
	const clipPath = `path('M 0,0 L 0,${size} L ${offset},${size} L ${offset},0 L 0,0')`;
	return (
		<div className={cn('relative', className)} style={style}>
			<div>
				<StarIcon
					fill="transparent"
					size={size}
					strokeWidth={1}
					className="text-neutral-300"
				/>
			</div>
			<div
				className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
				style={{ clipPath }}
			>
				<StarIcon fill="currentColor" size={18} className="text-amber-500" />
			</div>
		</div>
	);
};

export const StarRating = ({ value }: { value: number }) => {
	return (
		<div className="flex group">
			{Array(5)
				.fill(0)
				.map((_, i) => (
					<VariableStar
						key={i}
						className="group-hover:animate-bounce"
						style={{ animationDelay: `${i * 100}ms`, animationDuration: '600ms' }}
						value={value - i}
					/>
				))}
		</div>
	);
};
