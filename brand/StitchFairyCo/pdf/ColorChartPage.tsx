import { Page } from '@components/pdf/Page';
import { CrossStitchPdfPageProps } from '@infrastructure/pdf/types';

export const ColorChartPage = ({
	product: { pattern },
}: CrossStitchPdfPageProps) => (
	<Page>
		<div className="content">
			<div className="header">
				<span>Color Chart</span>
			</div>
			<table className="w-full">
				<tbody>
					{pattern.colors.map((floss, index) => (
						<tr key={index}>
							<td style={{ backgroundColor: floss.color }}>
								{floss.name} ({floss.palette})
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</Page>
);
