import { ReactNode } from "react";

export const DocumentContainer = ({
	title,
	children,
  cssStyles
}: {
	title: string;
	children: ReactNode;
  cssStyles: string;
}) => (
	<html lang="en">
		<head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>{title}</title>
			<style>{cssStyles}</style>
		</head>
		<body className="demo-container">{children}</body>
	</html>
);