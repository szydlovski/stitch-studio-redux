import { getXataClient } from '@/lib/xata';

export const getUserByEmail = (email: string) => {
	return getXataClient().db.user.select(['*']).filter({ email }).getFirst();
};
