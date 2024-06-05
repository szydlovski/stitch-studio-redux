import { ReactNode } from 'react';

export const DashboardViewLayout = ({
	title,
	children,
	breadcrumbs,
	action,
}: {
	title?: string;
	children?: ReactNode;
	breadcrumbs?: ReactNode;
	action?: ReactNode;
}) => {
	return (
		<div className="p-6 bg-muted/40 min-h-full">
			{breadcrumbs}
			{(title || action) && (
				<div className="flex items-start">
					{title && (
						<h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
					)}
					{action && <div className="ml-auto">{action}</div>}
				</div>
			)}
			{children && <div>{children}</div>}
		</div>
	);
};
