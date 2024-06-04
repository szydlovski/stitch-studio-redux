import { getXataClient } from '@/lib/xata';

export interface ListBrandRecord {
	name: string;
	totalProducts: number;
	owner: string;
	logo: string;
}

export const listBrands = () =>
	getXataClient()
		.db.brand.select([
			'*',
			'owner.name',
			'logo.signedUrl',
			'logo.signedUrlTimeout',
		])
		.sort('name')
		.getAll()
		.then((brands) =>
			brands.map(
				(brand): ListBrandRecord => ({
					name: brand.name ?? 'Unknown name',
					totalProducts: 25,
					owner: brand.owner?.name ?? 'Unknown owner',
					logo: brand.logo?.signedUrl!,
				})
			)
		);
