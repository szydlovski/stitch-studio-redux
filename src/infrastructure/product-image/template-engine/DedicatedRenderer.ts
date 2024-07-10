import { createCanvas, maskCanvas } from '@lib/canvas';
import { Renderer } from './renderer/Renderer';
import { Dimensions, TemplateLayer, TemplateProps } from './types';
import { Template } from './Template';

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

export class DedicatedRenderer extends Renderer {
	private cache = new CanvasCache();
	private ctx: CanvasRenderingContext2D;
	public constructor(
		private readonly template: Template,
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
	public loadTextures(): Promise<void> {
		return this.loadTemplateTextures(this.template);
	}
	private renderSingleLayer(
		layer: TemplateLayer,
		key: string,
		props: TemplateProps
	) {
		const layerContext = this.cache.get(key);
		const layerCanvas = layerContext.canvas;
		layerContext.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
		this.renderLayerContentOnCanvas(layer, props, layerContext);
		if (layer.mask) {
			const maskContext = this.cache.get(`${key}/mask`);
			this.renderLayerContentOnCanvas(layer.mask, props, maskContext);
			const masked = maskCanvas(layerCanvas, maskContext.canvas);
			layerContext.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
			layerContext.drawImage(masked, 0, 0);
		}
		return layerCanvas;
	}
	public render(props: TemplateProps): void {
		for (const [index, layer] of Object.entries(this.template.layers)) {
			const layerCanvas = this.renderSingleLayer(layer, index, props);
			this.ctx.globalAlpha = layer.opactity ?? 1;
			this.ctx.globalCompositeOperation = layer.mode ?? 'source-over';
			this.ctx.drawImage(layerCanvas, 0, 0);
		}
	}
}
