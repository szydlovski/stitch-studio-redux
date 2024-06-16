import { BrandDetailsAttributes } from '@/domain/brand/BrandDetails';
import { XataQuery } from '@/lib/XataQuery';

export class GetBrandQuery extends XataQuery<BrandDetailsAttributes> {
	public async execute(id: string): Promise<BrandDetailsAttributes> {
		return this.xata.db.brand
			.filter({ id })
			.select([
				'*',
				'logo.*',
				'logo.signedUrl',
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
					src: record.logo?.signedUrl ?? '',
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
