import { createCanvas, maskCanvas, repeatTile } from '@lib/canvas';
import { CrossStitchPattern } from '@domain/cross-stitch/CrossStitchPattern';
import {
	StylizedPatternTextureDictionary,
	StylizedPatternLayers,
	PaddingOpts,
	Padding,
} from '@domain/cross-stitch/types';

const resolvePaddingOpts = (options: PaddingOpts): Padding => {
	if (typeof options === 'number') {
		const n = options;
		return { left: n, top: n, right: n, bottom: n };
	} else if (Array.isArray(options)) {
		const [h, v] = options;
		return { left: h, top: v, right: h, bottom: v };
	} else {
		const { left, top, right, bottom } = options;
		return { left, top, right, bottom };
	}
};

export class CrossStitchPatternRenderer {
	constructor(private textures: StylizedPatternTextureDictionary) {}
	renderFlat(pattern: CrossStitchPattern, scale: number): HTMLCanvasElement {
		const targetWidth = pattern.width * scale;
		const targetHeight = pattern.height * scale;
		return createCanvas([targetWidth, targetHeight], (ctx) => {
			for (const { hex, pixels } of pattern.groups) {
				for (const { x, y } of pixels) {
					ctx.fillStyle = hex;
					ctx.fillRect(x * scale, y * scale, scale, scale);
				}
			}
		});
	}
	public renderEmbroideryMockup(
		pattern: CrossStitchPattern,
		scale: number
	): HTMLCanvasElement {
		const targetWidth = pattern.width * scale;
		const targetHeight = pattern.height * scale;
		const patternRender = this.renderFlat(pattern, scale);
		const [base, soft, overlay] = [
			StylizedPatternLayers.StitchBase,
			StylizedPatternLayers.StitchSoftLight,
			StylizedPatternLayers.StitchSoftLight,
		].map((layerName) =>
			maskCanvas(
				repeatTile(
					this.textures[layerName],
					pattern.width,
					pattern.height,
					scale
				),
				patternRender
			)
		);
		return createCanvas([targetWidth, targetHeight], (ctx) => {
			ctx.drawImage(base, 0, 0);

			ctx.globalCompositeOperation = 'multiply';
			ctx.drawImage(patternRender, 0, 0);

			ctx.globalCompositeOperation = 'source-over';
			ctx.globalAlpha = 0.03;
			ctx.drawImage(soft, 0, 0);

			ctx.globalAlpha = 0.3;
			ctx.globalCompositeOperation = 'overlay';
			ctx.drawImage(overlay, 0, 0);

			ctx.globalCompositeOperation = 'soft-light';
			ctx.globalAlpha = 0.15;
			ctx.drawImage(soft, 0, 0);
		});
	}
	public renderEmbroideryOnFabricMockup(
		pattern: CrossStitchPattern,
		scale: number,
		paddingOptions: PaddingOpts = 0,
		fabricColor: string = '#fff'
	) {
		const padding = resolvePaddingOpts(paddingOptions);
		const fabricWidth = pattern.width + padding.left + padding.right;
		const fabricHeight = pattern.height + padding.top + padding.bottom;
		const fabricTexture = repeatTile(
			this.textures[StylizedPatternLayers.Aida],
			fabricWidth,
			fabricHeight,
			scale
		);
		const stylizedRender = this.renderEmbroideryMockup(pattern, scale);
		return createCanvas(fabricTexture, (ctx) => {
			ctx.globalCompositeOperation = 'source-over';
			ctx.fillStyle = fabricColor;
			ctx.fillRect(0, 0, fabricTexture.width, fabricTexture.height);

			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = 'multiply';
			ctx.drawImage(fabricTexture, 0, 0);

			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(stylizedRender, padding.left * scale, padding.top * scale);
		});
	}
}
