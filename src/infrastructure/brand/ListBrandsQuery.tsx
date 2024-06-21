import { BrandItemAttributes } from '@domain/brand/BrandItem';
import { XataQuery } from '@/lib/api/XataQuery';

export class ListBrandsQuery extends XataQuery<BrandItemAttributes[]> {
	public execute() {
		return this.xata.db.brand
			.select([
				'*',
				'owner.name',
				'logo.signedUrl',
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
						owner: {
							name: brand.owner!.name!,
							id: brand.owner!.id,
						},
						logo: {
							src: brand.logo?.signedUrl ?? '',
							width: brand.logo?.attributes?.width,
							height: brand.logo?.attributes?.height,
						},
						attributes: brand.attributes!,
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
