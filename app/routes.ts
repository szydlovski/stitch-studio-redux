export const AppViews = {
	Dashboard: () => '/studio/dashboard',
	Products: () => '/studio/products',
	Product: (id: string) => `/studio/products/${id}`,
	ProductImages: (id: string) => `/studio/products/${id}?tab=images`,
	Brands: () => '/studio/brands',
	Brand: (id: string) => `/studio/brands/${id}`,
} satisfies Record<string, (...args: any[]) => string>;
