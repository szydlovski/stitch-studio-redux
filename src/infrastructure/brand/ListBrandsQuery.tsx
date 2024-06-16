import { BrandItemAttributes } from '@domain/brand/BrandItem';
import { XataQuery } from '@/lib/api/XataQuery';

export class ListBrandsQuery extends XataQuery<BrandItemAttributes[]> {
	public execute() {
		return this.xata.db.brand
			.select([
				'*',
				'owner.name',
				'logo.signedUrl',
				'logo.signedUrlTimeout',
				{
					name: '<-etsyAccount.brand',
					as: 'etsyAccount',
					columns: ['*'],
					limit: 1,
				},
			])
			.sort('name')
			.getAll()
			.then((brands) =>
				brands.map((brand): BrandItemAttributes => {
					const etsyAccount = brand.etsyAccount?.records[0];
					return {
						id: brand.id,
						name: brand.name ?? 'Unknown name',
						totalProducts: 25,
						owner: brand.owner?.name ?? 'Unknown owner',
						logo: brand.logo?.signedUrl!,
						etsy: etsyAccount
							? {
									id: etsyAccount.id,
									payload: etsyAccount,
							  }
							: undefined,
					};
				})
			);
	}
}
