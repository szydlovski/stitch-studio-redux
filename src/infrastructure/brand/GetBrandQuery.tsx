import { BrandDetailsAttributes } from '@domain/brand';
import { XataQuery } from '@lib/api/XataQuery';

export class GetBrandQuery extends XataQuery<BrandDetailsAttributes> {
	public async execute(id: string): Promise<BrandDetailsAttributes> {
		return this.xata.db.brand
			.filter({ id })
			.select([
				'*',
				'logo.*',
				'logo.signedUrl',
				'attributes',
				'owner.*',
				{
					name: '<-etsyAccount.brand',
					as: 'etsyAccount',
					columns: ['*'],
					limit: 1,
				},
			])
			.getFirstOrThrow()
			.then((record): BrandDetailsAttributes => {
				const etsyAccount = record.etsyAccount?.records[0];
				return {
					id: record.id,
					name: record.name!,
					attributes: record.attributes!,
					owner: {
						id: record.owner!.id,
						name: record.owner!.name!,
					},
					logo: {
						src: record.logo?.signedUrl ?? '',
						width: record.logo?.attributes?.width,
						height: record.logo?.attributes?.height,
					},
					etsy: etsyAccount
						? {
								id: etsyAccount.id,
								payload: etsyAccount.data,
						  }
						: undefined,
				};
			});
	}
}
