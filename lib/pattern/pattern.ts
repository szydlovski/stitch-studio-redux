import { Drawable } from '@/lib/canvas';
import { ColorGroup, RGBTuple } from './types';
import { v4 as uuid } from 'uuid';
import { readImageFromFile } from '../helpers';

export interface PatternData {
	readonly width: number;
	readonly height: number;
	readonly groups: ColorGroup[];
}

export class Pattern {
	private constructor(
		public readonly width: number,
		public readonly height: number,
		public readonly groups: ColorGroup[]
	) {}
	public getPixelColor(x: number, y: number): string | undefined {
		return this.groups.find(({ pixels }) =>
			pixels.some((pixel) => pixel.x === x && pixel.y === y)
		)?.hex;
	}
	public changeColor(oldColor: string, newColor: string): Pattern {
		const { width, height, groups } = this;
		return new Pattern(
			width,
			height,
			groups.map((group) =>
				group.hex === oldColor ? { ...group, hex: newColor } : group
			)
		);
	}
	public toData(): PatternData {
		const { width, height, groups } = this;
		return { width, height, groups };
	}
	public serialize(): string {
		return JSON.stringify(this.toData());
	}
	// utility getters
	get dimensionsText(): string {
		return `${this.width} x ${this.height}`;
	}
	get colorCount(): number {
		return this.groups.length;
	}
	get stitchCount(): number {
		return this.groups.reduce((total, group) => total + group.pixels.length, 0);
	}
	// static constructors
	static async fromFile(file: File): Promise<Pattern> {
		const img = await readImageFromFile(file);
		return Pattern.fromImage(img);
	}
	static fromImage(image: Drawable): Pattern {
		const { width, height } = image;
		const canvas = Object.assign(document.createElement('canvas'), {
			width,
			height,
		});
		const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
		ctx.drawImage(image, 0, 0);
		const imgData = ctx.getImageData(0, 0, image.width, image.height);
		const colors: Record<string, ColorGroup> = {};
		const rgbToHex = ([r, g, b]: RGBTuple): string =>
			`#${[r, g, b].reduce(
				(str, comp) => str + comp.toString(16).padStart(2, '0'),
				''
			)}`;
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
		return new Pattern(width, height, Object.values(colors));
	}
	static fromData({ width, height, groups }: PatternData): Pattern {
		return new Pattern(width, height, groups);
	}
}
