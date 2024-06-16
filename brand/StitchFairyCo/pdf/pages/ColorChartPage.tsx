import { Page } from '@components/pdf/Page';
import { PdfPageProps } from '../types';

export const ColorChartPage = ({ product: { pattern } }: PdfPageProps) => (
	<Page>
		<div className="content">
			<div className="header">
				<span>Color Chart</span>
			</div>
			<table className="w-full">
				<tbody>
					{pattern.groups.map((group, index) => (
						<tr key={index}>
							<td style={{ backgroundColor: group.hex }}>{group.hex}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</Page>
);
