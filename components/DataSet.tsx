import { Label } from '@/components/ui/label';
import { cn } from '@/lib';
import { ReactNode } from 'react';

interface DataSetProps {
	label: string;
	children?: ReactNode;
	className?: string;
}

export const DataSet = ({ label, children, className }: DataSetProps) => (
	<div className={cn('flex flex-col gap-1', className)}>
		<Label className="text-muted-foreground">{label}</Label>
		<span className="text-sm">{children || '-'}</span>
	</div>
);
