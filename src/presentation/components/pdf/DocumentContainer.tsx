import { ReactNode } from 'react';

export const DocumentContainer = ({
	title,
	children,
	cssStyles,
}: {
	title: string;
	children: ReactNode;
	cssStyles?: string;
}) => (
	<html lang="en">
		<body className="demo-container">{children}</body>
	</html>
);
