import { ReactNode } from 'react';

export const Page = ({ children }: { children: ReactNode }) => (
	<div className="h-[1123px] w-[794px] bg-white p-8">{children}</div>
);
