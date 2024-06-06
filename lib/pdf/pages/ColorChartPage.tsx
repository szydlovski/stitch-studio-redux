import { Page } from '../components/Page';
import { PdfPageProps } from '../types';

export const ColorChartPage = ({ pattern }: PdfPageProps) => (
	<Page>
		<div className="content">
			<div className="header">
				<span>Color Chart</span>
			</div>
			<table>
				{pattern.groups.map((group, index) => (
					<tr key={index}>
						<td style={{ backgroundColor: group.hex }}>{group.hex}</td>
					</tr>
				))}
			</table>
		</div>
	</Page>
);
