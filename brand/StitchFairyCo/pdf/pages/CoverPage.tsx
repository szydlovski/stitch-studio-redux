import { Page } from '@/lib/pdf/Page';
import { PdfPageProps } from '../types';

export const CoverPage = ({ product: { pattern, title } }: PdfPageProps) => {
	const dimensions = {
		14: pattern.getFinishedDimensions(14),
		16: pattern.getFinishedDimensions(16),
		18: pattern.getFinishedDimensions(18),
	};
	return (
		<Page>
			<div className="content">
				<div className="header">
					<img className="logo" src="/logo_3x.png" />
					<span className="title">{title}</span>
					<span className="subtitle">Cross Stitch Pattern</span>
				</div>
				<div className="columns">
					<div className="details">
						<h2>Pattern</h2>
						<table>
							<tr>
								<td>Title</td>
								<td>{title}</td>
							</tr>
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
						<h2>Dimensions</h2>
						<table>
							{Object.entries(dimensions).map(([key, dim]) => (
								<tr key={key} className="aida">
									<td>
										<span>{key}ct</span>
									</td>
									<td>
										<span>{`${dim.widthIn}" x ${dim.heightIn}"`}</span>
										<span>{`${dim.widthCm} cm x ${dim.heightCm} cm`}</span>
									</td>
								</tr>
							))}
						</table>
					</div>
					<div className="details">
				<div className="hoop-container">
					<img className="hoop" src="/loop.png" />
				</div>
						<h2>Tips</h2>
						<div className="details-content">
							<p>
								{`The size of your design depends on the cross stitch fabric you choose. The higher the fabric's "count" (the number of stitches per inch), the smaller the stitches and therefore your design.`}
							</p>
							<p>
								{`Refer to the next page for required thread colors and stitch counts. Threads come in 6 strands, which should be divided into 3 sets of 2 strands. You can complete approximately 1800 stitches using one skein.`}
							</p>
						</div>
					</div>
				</div>
				<div className="page-bottom">
					<div className="copyright">
						<p>{`Copyright © KamCraft s.c.`}</p>
						<p>
							{`All rights reserved. This pattern and all its variations constitute copyrighted work of KamCraft s.c. (trading as StitchFairyCo). This pattern is intended for personal use only and may not be resold, redistributed or published in digital or printed form.`}
						</p>
					</div>
				</div>
			</div>
		</Page>
	);
};
