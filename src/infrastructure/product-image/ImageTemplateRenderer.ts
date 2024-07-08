import {
	Drawable,
	createCanvas,
	loadImage,
	maskCanvas,
	rotateImage,
	trimCanvas,
} from '@lib/canvas';
import {
	TemplateManifest,
	TemplateProps,
	TextureDictionary,
	LayerType,
	TemplateLayer,
	Dimensions,
	TemplatePropDefinition,
} from './types';

// TODO stateful renderer for a specific template with layer level caching

export class ImageTemplate {
	constructor(private readonly manifest: TemplateManifest) {}
	public get layers(): TemplateLayer[] {
		return this.manifest.layers;
	}
	public get dimensions(): Dimensions {
		return this.manifest.dimensions;
	}
	public get props(): TemplatePropDefinition[] {
		return this.manifest.props;
	}
	public getManifest(): TemplateManifest {
		return this.manifest;
	}
	public getTextureUrls(): string[] {
		return this.manifest.layers.flatMap((layer) => {
			const urls = [];
			if (layer.type === LayerType.StaticTexture) urls.push(layer.textureUrl);
			if (layer.mask && layer.mask?.type === LayerType.StaticTexture)
				urls.push(layer.mask.textureUrl);
			return urls;
		});
	}
}

enum RenderErrorType {
	Undefined = 'Undefined',
	TextureNotFound = 'TextureNotFound',
}

export class RenderError extends Error {
	public readonly name = 'RenderError';
	private constructor(
		public readonly message: string,
		public readonly type: RenderErrorType = RenderErrorType.Undefined,
		public readonly meta?: Record<string, any>
	) {
		super(message);
	}
	public static TextureNotFound(url: string): RenderError {
		return new RenderError(
			`Texture ${url} not found. Make sure to preload template textures before rendering.`,
			RenderErrorType.TextureNotFound,
			{ url }
		);
	}
	public static TextureFailedToLoad(url: string): RenderError {
		return new RenderError(
			`Failed to load texture ${url}.`,
			RenderErrorType.TextureNotFound,
			{ url }
		);
	}
}

export class TextureCache {
	private cache: TextureDictionary = {};
	public get(url: string): Drawable {
		const texture = this.cache[url];
		if (!texture) throw RenderError.TextureNotFound(url);
		return texture;
	}
	public set(url: string, texture: Drawable): void {
		this.cache[url] = texture;
	}
	public async load(url: string): Promise<void> {
		try {
			const image = await loadImage(url);
			this.cache[url] = image;
		} catch (error) {
			throw RenderError.TextureFailedToLoad(url);
		}
	}
}

export class ImageTemplateRenderer {
	private textureCache = new TextureCache();

	public async preloadTemplateTextures(
		template: TemplateManifest
	): Promise<void> {
		const urls = new ImageTemplate(template).getTextureUrls();
		await Promise.all(urls.map((url) => this.textureCache.load(url)));
	}

	// main rendering logic
	protected renderLayerOnCanvas(
		layer: TemplateLayer,
		props: TemplateProps,
		ctx: CanvasRenderingContext2D
	): void {
		const { width, height } = ctx.canvas;
		const getProp = <T>(name: string): T => {
			const value = (props ?? {})[name] as T;
			if (!value) throw new Error(`Template prop not found: ${name}`);
			return value;
		};
		switch (layer.type) {
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
		props: TemplateProps,
		ctx?: CanvasRenderingContext2D
	): HTMLCanvasElement {
		if (ctx) {
			this.renderLayerOnCanvas(layer, props, ctx);
			return ctx.canvas;
		}
		return createCanvas(template.dimensions, (ctx) =>
			this.renderLayerOnCanvas(layer, props, ctx)
		);
	}

	private renderTemplateOnCanvas(
		template: TemplateManifest,
		props: TemplateProps,
		ctx: CanvasRenderingContext2D
	): void {
		for (const layer of template.layers) {
			let layerRender = this.renderLayer(layer, template, props);
			if (layer.mask) {
				const maskRender = this.renderLayer(layer.mask, template, props);
				layerRender = maskCanvas(layerRender, maskRender);
			}
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

class CanvasCache {
	private cache: Record<string, CanvasRenderingContext2D> = {};
	public create(key: string, dimensions: Dimensions): void {
		const canvas = createCanvas(dimensions);
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Failed to get canvas context');
		this.cache[key] = ctx;
	}
	public get(key: string): CanvasRenderingContext2D {
		const canvas = this.cache[key];
		if (!canvas) throw new Error(`Canvas not found in cache: ${key}`);
		return canvas;
	}
}

export class StatefulImageTemplateRenderer extends ImageTemplateRenderer {
	private cache = new CanvasCache();
	private ctx: CanvasRenderingContext2D;
	public constructor(
		private readonly template: ImageTemplate,
		canvas: HTMLCanvasElement
	) {
		super();
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Failed to get canvas context');
		this.ctx = ctx;
		for (const [index, layer] of Object.entries(this.template.layers)) {
			this.cache.create(index, this.template.dimensions);
			if (layer.mask)
				this.cache.create(`${index}/mask`, this.template.dimensions);
		}
	}
	private renderOnCanvas(props: TemplateProps): void {
		const ctx = this.ctx;
		for (const [index, layer] of Object.entries(this.template.layers)) {
			// new canvas created
			const layerContext = this.cache.get(index);
			const layerCanvas = layerContext.canvas;
			this.renderLayerOnCanvas(layer, props, layerContext);
			if (layer.mask) {
				const maskContext = this.cache.get(`${index}/mask`);
				this.renderLayerOnCanvas(layer.mask, props, maskContext);
				const masked = maskCanvas(layerCanvas, maskContext.canvas);
				layerContext.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
				layerContext.drawImage(masked, 0, 0);
			}
			ctx.globalCompositeOperation = layer.mode ?? 'source-over';
			ctx.drawImage(layerContext.canvas, 0, 0);
		}
	}
}
