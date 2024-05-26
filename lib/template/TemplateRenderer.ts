import {
	Drawable,
	createCanvas,
	loadImage,
	maskCanvas,
	rotateImage,
	trimCanvas,
} from '../canvas';
import { LayerType, TemplateLayer } from './layer';
import { TemplateManifest, TemplateProps, TextureDictionary } from './types';

export class TemplateRenderer {
	textureCache: TextureDictionary = {};
	static getTemplateTextureUrls(template: TemplateManifest): string[] {
		return template.layers.flatMap((layer) => {
			const urls = [];
			if (layer.type === LayerType.StaticTexture) urls.push(layer.textureUrl);
			if (layer.mask && layer.mask?.type === LayerType.StaticTexture)
				urls.push(layer.mask.textureUrl);
			return urls;
		});
	}
	public async preloadTemplateTextures(
		template: TemplateManifest
	): Promise<void> {
		const urls = TemplateRenderer.getTemplateTextureUrls(template);
		const textures = Object.fromEntries(
			await Promise.all(
				urls.map((url) => loadImage(url).then((image) => [url, image]))
			)
		);
		Object.assign(this.textureCache, textures);
	}
	private renderTemplateLayer(
		layer: TemplateLayer,
		template: TemplateManifest,
		props: TemplateProps
	): HTMLCanvasElement {
		const { width, height } = template.dimensions;
		const getProp = <T>(name: string): T => {
			const value = (props ?? {})[name] as T;
			if (!value) throw new Error(`Template prop not found: ${name}`);
			return value;
		};
		return createCanvas(template.dimensions, (ctx) => {
			switch (layer.type) {
				case LayerType.StaticTexture: {
					let image: Drawable = this.getTexture(layer.textureUrl);
					if (layer.rotation)
						image = trimCanvas(rotateImage(image, layer.rotation));
					ctx.drawImage(
						image,
						layer.x ?? 0,
						layer.y ?? 0,
						layer.width ?? width,
						layer.height ?? height
					);
					break;
				}
				case LayerType.TextureProp: {
					let image = getProp<Drawable>(layer.propName);
					if (layer.rotation) {
						image = trimCanvas(rotateImage(image, layer.rotation));
					}
					ctx.drawImage(
						image,
						layer.x ?? 0,
						layer.y ?? 0,
						layer.width ?? width,
						layer.height ?? height
					);
					break;
				}
				case LayerType.ColorProp: {
					ctx.fillStyle = getProp<string>(layer.propName);
					ctx.fillRect(
						layer.x ?? 0,
						layer.y ?? 0,
						layer.width ?? width,
						layer.height ?? height
					);
					break;
				}
			}
		});
	}
	public renderTemplate(
		template: TemplateManifest,
		props: TemplateProps
	): HTMLCanvasElement {
		return createCanvas(template.dimensions, (ctx) => {
			for (const layer of template.layers) {
				let layerRender = this.renderTemplateLayer(layer, template, props);
				if (layer.mask) {
					const maskRender = this.renderTemplateLayer(
						layer.mask,
						template,
						props
					);
					layerRender = maskCanvas(layerRender, maskRender);
				}
				ctx.globalCompositeOperation = layer.mode ?? 'source-over';
				ctx.drawImage(layerRender, 0, 0);
			}
		});
	}
	private getTexture(url: string): Drawable {
		const texture = this.textureCache[url];
		if (!texture) {
			throw new Error(
				`Texture ${url} not found. Make sure to preload template textures before rendering.`
			);
		}
		return texture;
	}
}
