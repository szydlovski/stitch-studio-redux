import { XataQuery } from '@lib/api/XataQuery';

export class GlobalSearchQuery extends XataQuery<any> {
	public execute(searchTerm: string): Promise<any> {
		return this.xata.search
			.all(searchTerm, {
				tables: [
					{
						table: 'product',
						target: ['title'],
					},
				],
			})
			.then((results) => ({
				total: results.totalCount,
				results: results.records.map(({ record, table }) => ({
					record: record.toSerializable(),
					table,
				})),
			}));
	}
}
