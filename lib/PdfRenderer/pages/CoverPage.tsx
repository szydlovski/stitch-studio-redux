import { DataSet } from '../components/DataSet';
import { Page } from '../components/Page';
import { PdfPageProps } from '../types';

export const CoverPage = ({ product, pattern }: PdfPageProps) => (
	<Page>
		<div className="content">
			<div className="header">
				<span>[Logo]</span>
				<span>{product.title}</span>
				<span>Cross Stitch Pattern</span>
			</div>
			<div className="columns">
				<div>
					<h2>Pattern Details</h2>
					<table>
						<tr>
							<td>Width</td>
							<td>{pattern.width}</td>
						</tr>
						<tr>
							<td>Height</td>
							<td>{pattern.height}</td>
						</tr>
						<tr>
							<td>Colors</td>
							<td>{pattern.groups.length}</td>
						</tr>
					</table>
					<div className="dataset-group">
						<DataSet label="Width" value={pattern.width} />
						<DataSet label="Height" value={pattern.height} />
						<DataSet label="Colors" value={pattern.groups.length} />
					</div>
					<h2>Tips</h2>
					<p>
						The size of your design depends on the cross stitch fabric you
						choose. The higher the fabric's "count" (the number of stitches per
						inch), the smaller the stitches and therefore your design
					</p>
					<p>
						Refer to the next page for required thread colors and stitch counts.
						Threads come in 6 strands, which should be divided into 3 sets of 2
						strands. You can complete approximately 1800 stitches using one
						skein.
					</p>
				</div>
				<div>[Loop Mockup]</div>
			</div>
			<div className="copyright">
				<p>Copyright © KamCraft s.c.</p>
				<p>
					All rights reserved. This pattern and all its variations constitute
					copyrighted work of KamCraft s.c. (trading as StitchFairyCo). This
					pattern is intended for personal use only and may not be resold,
					redistributed or published in digital or printed form.
				</p>
			</div>
		</div>
	</Page>
);
