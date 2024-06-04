import { ProductRepository } from '../domain/ProductRepository';
import { ProductItem } from '../domain/ProductItem';
import { ProductDetails } from '../domain/ProductDetails';

export class ProductApiClient implements ProductRepository {
	private async fetch(input: string | URL, init?: RequestInit): Promise<any> {
		const response = await fetch(input, init);
		return response.json();
	}
	async list(): Promise<ProductItem[]> {
		return this.fetch('/api/products').then((data) => data.products);
	}

	async get(productId: string): Promise<ProductDetails> {
		return this.fetch(`/api/products/${productId}`);
	}

	async delete(productId: string): Promise<void> {
		return this.fetch(`/api/products/${productId}`, {
			method: 'DELETE',
		});
	}

	async create(title: string, thumbnail: string, data: any): Promise<any> {
		return this.fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify({ title, thumbnail, data }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	async changeTitle(productId: string, title: string): Promise<void> {
		return this.fetch(`/api/products/${productId}`, {
			method: 'PATCH',
			body: JSON.stringify({ title }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
