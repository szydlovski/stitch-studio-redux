import { Page } from '@components/pdf/Page';
import { CrossStitchPdfPageProps } from '@infrastructure/pdf/types';

export const CoverPageHeader = ({ title }: { title: string }) => {
	return (
		<div className="flex flex-col justify-center text-center">
			<div className="flex justify-center items-center">
				<img src="/logo_3x.png" />
			</div>
			<span className="text-2xl font-semibold">{title}</span>
			<span className="text-sm uppercase tracking-[0.1rem]">
				Cross Stitch Pattern
			</span>
		</div>
	);
};

export const CoverPageCopyrights = () => {
	return (
		<div className="flex flex-col border-2 border-red-600 text-red-600 p-4 gap-2 text-sm font-semibold rounded-md">
			<p className="font-bold">{`Copyright © KamCraft s.c.`}</p>
			<p>
				{`All rights reserved. This pattern and all its variations constitute copyrighted work of KamCraft s.c. (trading as StitchFairyCo). This pattern is intended for personal use only and may not be resold, redistributed or published in digital or printed form.`}
			</p>
		</div>
	);
};

const Details = ({
	header,
	children,
}: {
	header: string;
	children: React.ReactNode;
}) => (
	<div>
		<h2>{header}</h2>
		{children}
	</div>
);

export const CoverPage = ({ product: { pattern, title } }: CrossStitchPdfPageProps) => {
	const dimensions = {
		14: pattern.getFinishedDimensions(14),
		16: pattern.getFinishedDimensions(16),
		18: pattern.getFinishedDimensions(18),
	};
	return (
		<Page>
			<div className="flex flex-col gap-4 h-full">
				<CoverPageHeader title={title} />
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Details header="Pattern">
							<table>
								<tbody>
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
										<td>{pattern.colors.length}</td>
									</tr>
								</tbody>
							</table>
						</Details>
						<Details header="Dimensions">
							<table>
								<tbody>
									{Object.entries(dimensions).map(([key, dim]) => (
										<tr key={key}>
											<td>
												<span>{key}ct</span>
											</td>
											<td>
												<span>{`${dim.widthIn}" x ${dim.heightIn}"`}</span>
												<span>{`${dim.widthCm} cm x ${dim.heightCm} cm`}</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</Details>
						<Details header="Tips">
							<p>
								{`The size of your design depends on the cross stitch fabric you choose. The higher the fabric's "count" (the number of stitches per inch), the smaller the stitches and therefore your design.`}
							</p>
							<p>
								{`Refer to the next page for required thread colors and stitch counts. Threads come in 6 strands, which should be divided into 3 sets of 2 strands. You can complete approximately 1800 stitches using one skein.`}
							</p>
						</Details>
					</div>
					<div>
						<img src="/loop.png" />
					</div>
				</div>
				<div className="mt-auto">
					<CoverPageCopyrights />
				</div>
			</div>
		</Page>
	);
};
