import {
	Drawable,
	createCanvas,
	maskCanvas,
	rotateImage,
	trimCanvas,
} from '@lib/canvas';
import { RenderErrorBuilder } from '../RenderError';
import { Template } from '../Template';
import {
	LayerType,
	TemplateLayer,
	TemplateManifest,
	TemplateProps,
} from '../types';
import { TextureCache } from './TextureCache';

export class Renderer {
	protected textureCache = new TextureCache();

	public async loadTemplateTextures(template: Template): Promise<void> {
		await Promise.all(
			template.textureUrls.map((url) => this.textureCache.load(url))
		);
	}

	// main rendering logic
	protected renderLayerContentOnCanvas(
		layer: TemplateLayer,
		props: TemplateProps,
		ctx: CanvasRenderingContext2D
	): void {
		const { width, height } = ctx.canvas;
		const getProp = <T>(name: string): T => {
			const value = props[name] as T;
			if (!value) throw RenderErrorBuilder.TemplatePropNotFound(name);
			return value;
		};
		switch (layer.type) {
			case LayerType.SmartObject: {
				let image: Drawable = this.renderTemplate(layer.template, props);
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
			case LayerType.StaticTexture: {
				let image: Drawable = this.textureCache.get(layer.textureUrl);
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
	}

	protected renderLayer(
		layer: TemplateLayer,
		template: TemplateManifest,
		props: TemplateProps
	): HTMLCanvasElement {
		let layerRender = createCanvas(template.dimensions, (ctx) =>
			this.renderLayerContentOnCanvas(layer, props, ctx)
		);
		if (layer.mask) {
			const mask = layer.mask;
			const maskRender = createCanvas(template.dimensions, (ctx) =>
				this.renderLayerContentOnCanvas(mask, props, ctx)
			);
			layerRender = maskCanvas(layerRender, maskRender);
		}
		return layerRender;
	}

	protected renderTemplateOnCanvas(
		template: TemplateManifest,
		props: TemplateProps,
		ctx: CanvasRenderingContext2D
	): void {
		for (const layer of template.layers) {
			const layerRender = this.renderLayer(layer, template, props);
			ctx.globalAlpha = layer.opactity ?? 1;
			ctx.globalCompositeOperation = layer.mode ?? 'source-over';
			ctx.drawImage(layerRender, 0, 0);
		}
	}

	// main public API
	public renderTemplate(
		template: TemplateManifest,
		props: TemplateProps,
		ctx?: CanvasRenderingContext2D
	): HTMLCanvasElement {
		if (ctx) {
			this.renderTemplateOnCanvas(template, props, ctx);
			return ctx.canvas;
		}
		return createCanvas(template.dimensions, (ctx) =>
			this.renderTemplateOnCanvas(template, props, ctx)
		);
	}
}
