export const DataSet = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<div className="dataset">
		<span className="dataset__label">{label}</span>
		<span className="dataset__value">{value}</span>
	</div>
);
