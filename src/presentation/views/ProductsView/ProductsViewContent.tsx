'use client';
import { ErrorAlert } from '@components/ErrorAlert';
import { QueryStatusGuard } from '@components/guard';
import { Tabs, View } from '@components/ui';

import { useProductsViewContext } from './ProductsViewContext';
import { ProductsViewHeader } from './components/ProductsViewHeader';
import { VIEW_MODE_CONFIG_MAP } from './config';
import { ProductsViewMode } from './types';

export const ProductsViewContent = () => {
	const {
		query: { data, status },
		viewMode,
		setViewMode,
	} = useProductsViewContext();
	const { Loading, Content } = VIEW_MODE_CONFIG_MAP[viewMode];
	return (
		<Tabs
			value={viewMode}
			onValueChange={(value) => setViewMode(value as ProductsViewMode)}
			asChild
		>
			<View>
				<ProductsViewHeader />

				<QueryStatusGuard
					props={data}
					status={status}
					loadingContent={<Loading />}
					errorContent={
						<ErrorAlert
							title={'Error'}
							description={
								'An error occurred while fetching products. Please try again later.'
							}
						/>
					}
				>
					{({ products }) => <Content products={products} />}
				</QueryStatusGuard>
			</View>
		</Tabs>
	);
};
