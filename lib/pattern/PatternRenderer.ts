import { createCanvas, maskCanvas, repeatTile } from '../canvas';
import { resolvePaddingOpts } from './helpers';
import { Pattern } from './pattern';
import {
	StylizedPatternTextureDictionary,
	StylizedPatternLayers,
	PaddingOpts,
} from './types';

export class PatternRenderer {
	constructor(private textures: StylizedPatternTextureDictionary) {}
	renderFlat(pattern: Pattern, scale: number): HTMLCanvasElement {
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
	public renderEmbroideryMockup(pattern: Pattern, scale: number): HTMLCanvasElement {
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
		pattern: Pattern,
		scale: number,
		paddingOptions: PaddingOpts = 0
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
			ctx.drawImage(fabricTexture, 0, 0);
			ctx.drawImage(stylizedRender, padding.left * scale, padding.top * scale);
		});
	}
}
