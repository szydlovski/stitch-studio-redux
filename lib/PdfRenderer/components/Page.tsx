import { ReactNode } from 'react';

export const Page = ({ children }: { children: ReactNode }) => (
	<div className="paper">{children}</div>
);
