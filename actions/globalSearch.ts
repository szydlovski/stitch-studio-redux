'use server';
import { getXataClient } from '@/lib/xata';

export const globalSearch = (term: string) =>
	getXataClient()
		.search.all(term, {
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
