import { getXataClient } from '@/lib/xata';

export const deleteProduct = (productId: string) =>
	getXataClient().db.product.update({ id: productId, deleted: true });
