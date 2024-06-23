import { cn } from '@lib/utils';
import { Loader2Icon } from 'lucide-react';
import { Button, ButtonProps } from './button';

interface LoadingButtonProps extends ButtonProps {
	loading?: boolean;
}

export const LoadingButton = ({
	children,
	className,
	loading,
	...props
}: LoadingButtonProps) => {
	return (
		<Button {...props} className={cn(className, 'relative overflow-hidden')}>
			{children}
			<span
				className={cn(
					'bg-primary opacity-0 absolute top-0 left-0 w-full h-full flex justify-center items-center',
					{
						'opacity-100': loading,
					}
				)}
			>
				<Loader2Icon size={18} className="x animate-spin" />
			</span>
		</Button>
	);
};
