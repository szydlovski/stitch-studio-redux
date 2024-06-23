import { FullProductObject } from '@domain/product';
import { CrossStitchPdfConfig } from './types';
// TODO get rid of this monstrosity
import { stitchTableCss } from '@brand/StitchFairyCo/pdf/css';

interface CrossStitchPdfProps {
	config: CrossStitchPdfConfig;
	product: FullProductObject;
}

export const CrossStitchPdf = ({
	config: {
		pages: { front: frontPages, back: backPages, pattern: PatternPage },
		grid: { width: GRID_WIDTH, height: GRID_HEIGHT },
	},
	product,
}: CrossStitchPdfProps) => {
	const { width, height } = product.pattern;
	const pageCols = Math.ceil(width / GRID_WIDTH);
	const pageRows = Math.ceil(height / GRID_HEIGHT);
	const align = 'center';
	const [xOffset, yOffset] =
		align === 'center'
			? [
					-Math.round((GRID_WIDTH * pageCols - width) / 2),
					-Math.round((GRID_HEIGHT * pageRows - height) / 2),
			  ]
			: [0, 0];
	return (
		<>
			<style>{stitchTableCss}</style>
			{frontPages?.map(({ render: Page }, index) => (
				<Page key={index} product={product} />
			))}
			{Array(pageRows)
				.fill(0)
				.flatMap((_, row) =>
					Array(pageCols)
						.fill(0)
						.map((_, col) => (
							<PatternPage
								key={`${col}-${row}`}
								index={col * pageRows + row}
								product={product}
								xOffset={xOffset + col * GRID_WIDTH}
								yOffset={yOffset + row * GRID_HEIGHT}
							/>
						))
				)}
			{backPages?.map(({ render: Page }, index) => (
				<Page key={index} product={product} />
			))}
		</>
	);
};
