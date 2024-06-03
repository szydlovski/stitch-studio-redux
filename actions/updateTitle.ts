import { getXataClient } from '@/lib/xata';

export const updateTitle = (productId: string, title: string) =>
	getXataClient().db.product.update({ id: productId, title });
