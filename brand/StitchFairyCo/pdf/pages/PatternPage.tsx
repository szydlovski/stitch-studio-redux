import { ColorTuple } from '@/lib/color';
import { Page } from '@components/pdf/Page';
import { CrossStitchPdfPageProps, CrossStitchPdfPatternPageProps } from '../types';
import { stitchTableCss } from '../css';
import { hexToRgb } from '@/lib/color';

const symbolDictionary =
	'/❤１✖○２★▼３◐☁４●◪５♡✽６◆♛７V◭８\\◉９✚!◼$ʌ◧⬟✦ABCDEFGHIJKLMNOPQRSTUWXYZ';

const getContrastColor = (color: ColorTuple) => {
	const [r, g, b] = color;
	const value = r * 0.299 + g * 0.587 + b * 0.114;
	return value > 200 ? '#000000' : '#ffffff';
};

const GRID_WIDTH = 60;
const GRID_HEIGHT = 80;



export const SinglePatternPage = ({
	index,
	product: { pattern },
	xOffset = 0,
	yOffset = 0,
}: CrossStitchPdfPatternPageProps) => {
	return (
		<Page>
			<div className="flex flex-col gap-4 h-full">
				<table className="pattern-table">
					<tbody>
						{Array(80)
							.fill(0)
							.map((_, row) => {
								return (
									<tr key={row}>
										{Array(60)
											.fill(0)
											.map((_, column) => {
												const colorGroup = pattern.getColorGroup(
													xOffset + column,
													yOffset + row
												);
												return (
													<td
														key={column}
														style={
															{
																'--c': colorGroup?.hex,
																'--t':
																	colorGroup &&
																	getContrastColor(hexToRgb(colorGroup.hex)),
															} as any
														}
													>
														{colorGroup && (
															<a>
																{
																	symbolDictionary[
																		pattern.getGroupIndex(colorGroup)
																	]
																}
															</a>
														)}
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
					</tbody>
				</table>
			</div>
		</Page>
	);
};

interface PatternPagesOptions {
	align: PatternAlignment;
}

interface PatternPagesProps extends CrossStitchPdfPageProps {
	options?: PatternPagesOptions;
}

export const PatternPages = ({
	product,
	options = { align: 'top-left' },
}: PatternPagesProps) => {
	const { width, height } = product.pattern;
	const pageCols = Math.ceil(width / GRID_WIDTH);
	const pageRows = Math.ceil(height / GRID_HEIGHT);
	const [xOffset, yOffset] =
		options.align === 'center'
			? [
					-Math.round((GRID_WIDTH * pageCols - width) / 2),
					-Math.round((GRID_HEIGHT * pageRows - height) / 2),
			  ]
			: [0, 0];
	return (
		<>
			<style>{stitchTableCss}</style>
			{Array(pageRows)
				.fill(0)
				.map((_, row) =>
					Array(pageCols)
						.fill(0)
						.map((_, col) => (
							<SinglePatternPage
								key={`${col}-${row}`}
								index={col * pageRows + row}
								product={product}
								xOffset={xOffset + col * GRID_WIDTH}
								yOffset={yOffset + row * GRID_HEIGHT}
							/>
						))
				)}
		</>
	);
};

type PatternAlignment = 'center' | 'top-left';

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
