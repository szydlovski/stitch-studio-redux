import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ReactNode } from 'react';

interface ColumnConfig<T> {
	key: string;
	label?: string;
	className?: string;
	cell: ({ row }: { row: T }) => ReactNode;
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
