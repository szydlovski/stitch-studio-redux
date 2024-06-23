import { getXataClient } from '@lib/xata';
import { XataQuery } from '@lib/api/XataQuery';

export class GetUserByEmailQuery extends XataQuery<any> {
	public execute(email: string) {
		return this.xata.db.user
			.select(['*'])
			.filter({ email })
			.getFirstOrThrow()
			.then((user) => user!.toSerializable());
	}
}
