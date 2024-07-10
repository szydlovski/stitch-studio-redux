import { Drawable, loadImage } from '@lib/canvas';
import { RenderErrorBuilder } from '../RenderError';
import { TextureDictionary } from '../types';

export class TextureCache {
	private cache: TextureDictionary = {};
	public get(url: string): Drawable {
		const texture = this.cache[url];
		if (!texture) throw RenderErrorBuilder.TextureNotFound(url);
		return texture;
	}
	public has(url: string): boolean {
		return this.cache[url] !== undefined;
	}
	public set(url: string, texture: Drawable): void {
		this.cache[url] = texture;
	}
	public async load(url: string): Promise<void> {
		try {
			const image = await loadImage(url);
			this.cache[url] = image;
		} catch (error) {
			throw RenderErrorBuilder.TextureFailedToLoad(url);
		}
	}
}
