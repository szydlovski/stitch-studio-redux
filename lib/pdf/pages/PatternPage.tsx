import { Page } from '../components/Page';
import { PdfPageProps } from '../types';

export const PatternPage = ({ pattern }: PdfPageProps) => (
	<Page>
		<div className="pattern-page-container">
			<div className="pattern-footer">
				<img className="pattern-footer-logo" src="/logo_3x.png" />
			</div>
			<table className="pattern-table">
				{Array(80)
					.fill(0)
					.map((_, row) => {
						return (
							<tr key={row}>
								{Array(60)
									.fill(0)
									.map((_, column) => {
										return (
											<td
												key={column}
												style={
													{
														'--c': pattern.getPixelColor(column, row),
													} as any
												}
											>
												❤
												<GridNumber
													row={row}
													column={column}
													maxRow={80}
													maxColumn={60}
												/>
											</td>
										);
									})}
							</tr>
						);
					})}
			</table>
		</div>
	</Page>
);

export const GridNumber = ({
	row,
	column,
	maxRow,
	maxColumn,
}: {
	row: number;
	column: number;
	maxRow: number;
	maxColumn: number;
}) => {
	const rowNumber = row + 1;
	const isFirstRow = rowNumber === 1;
	const isLastRow = rowNumber === maxRow;

	const columnNumber = column + 1;
	const isFirstColumn = columnNumber === 1;
	const isLastColumn = columnNumber === maxColumn;

	const showColumnNumber = columnNumber % 5 === 0 && (isFirstRow || isLastRow);
	const showRowNumber = rowNumber % 5 === 0 && (isFirstColumn || isLastColumn);
	return (
		<>
			{showColumnNumber && (
				<div className={`gn cn${isFirstRow ? 'f' : 'l'}`}>{column + 1}</div>
			)}
			{showRowNumber && (
				<div className={`gn rn${isFirstColumn ? 'f' : 'l'}`}>{row + 1}</div>
			)}
		</>
	);
};
