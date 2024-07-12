import { LucideProps } from "lucide-react";
import { FC } from "react";


export interface EmptyStateProps {
	header: string;
	description: string;
	icon: FC<LucideProps>;
}

export const StatsCard = ({ header, icon: Icon, description }: EmptyStateProps) => {
	return (
		<div>
			<Icon size={48} />
			<h2>{header}</h2>
			<p>{description}</p>
		</div>
	);
};
