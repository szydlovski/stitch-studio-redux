import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui';
import { FC } from 'react';

interface ColumnConfig<T> {
	key: string;
	label?: string;
	className?: string;
	cell: FC<{ row: T }>;
}

export const DataTable = <T,>({
	columns,
	data,
}: {
	columns: ColumnConfig<T>[];
	data: T[];
}) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map(({ key, label, className }) => (
						<TableHead key={key} className={className}>
							{label}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, i) => (
					<TableRow key={i}>
						{columns.map(({ key, className, cell: Cell }) => (
							<TableCell key={key} className={className}>
								<Cell row={row} />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
