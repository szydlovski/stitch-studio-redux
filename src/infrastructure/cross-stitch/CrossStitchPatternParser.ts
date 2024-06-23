import { Drawable } from '@lib/canvas';
import { v4 as uuid } from 'uuid';
import { readImageFromFile } from '@presentation/utils';
import { CrossStitchPattern, ColorGroup } from '@domain/cross-stitch';
import { rgbToHex } from '@lib/color';

export class CrossStitchPatternParser {
	static async parseImageFile(file: File): Promise<CrossStitchPattern> {
		const img = await readImageFromFile(file);
		return CrossStitchPatternParser.parseImage(img);
	}
	static parseImage(image: Drawable): CrossStitchPattern {
		const { width, height } = image;
		const canvas = Object.assign(document.createElement('canvas'), {
			width,
			height,
		});
		const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
		ctx.drawImage(image, 0, 0);
		const imgData = ctx.getImageData(0, 0, image.width, image.height);
		const 
		e: any[] = [];
		const colors: Record<string, ColorGroup> = {};

		for (let y = 0; y < image.height; y++) {
			for (let x = 0; x < image.width; x++) {
				const offset = y * image.width * 4 + x * 4;
				const values = imgData.data.slice(offset, offset + 4);
				const r = values[0],
					g = values[1],
					b = values[2],
					a = values[3];
				if (a === 0) continue;
				const hex = rgbToHex([r, g, b]);
				if (colors[hex] === undefined)
					colors[hex] = { pixels: [], id: uuid(), hex };
				colors[hex].pixels.push({ x, y });
			}
		}
		return CrossStitchPattern.fromAttributes({
			width,
			height,
			groups: Object.values(colors),
		});
	}
}
