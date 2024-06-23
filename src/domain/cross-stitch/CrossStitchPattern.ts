import { DrawnStitch } from '@presentation/views/CrossStitchEdit/editor/crossStitchEditorReducer';
import { ColorGroup, CrossStitchPatternData } from './types';

export interface FlossColor {
	name: string;
	color: string;
	palette: string;
}

export class CrossStitchPattern {
	private constructor(
		public readonly width: number,
		public readonly height: number,
		public readonly groups: ColorGroup[]
	) {}
	static fromAttributes({
		width,
		height,
		groups,
	}: CrossStitchPatternData): CrossStitchPattern {
		return new CrossStitchPattern(width, height, groups);
	}
	private getDataArrayIndex({ x, y }: { x: number; y: number }): number {
		return y * this.width + x;
	}
	public getStitches(): DrawnStitch[] {
		const stitches: DrawnStitch[] = [];
		for (const [index, { pixels }] of Object.entries(this.groups)) {
			const colorNumber = Number(index);
			for (const { x, y } of pixels) {
				stitches.push({ x, y, color: colorNumber });
			}
		}
		return stitches;
	}
	public getColors(): FlossColor[] {
		return this.groups.map(({ hex }, index) => ({
			name: `Color ${index}`,
			color: hex,
			palette: 'custom',
		}));
	}
	public getRawArray(): (number | undefined)[] {
		const data: (number | undefined)[] = Array(this.width * this.height).fill(
			undefined
		);
		for (const [index, { pixels }] of Object.entries(this.groups)) {
			const colorNumber = Number(index);
			for (const pixel of pixels) {
				data[this.getDataArrayIndex(pixel)] = colorNumber;
			}
		}
		return data;
	}
	public getGroupIndex(group: ColorGroup): number {
		return this.groups.findIndex(({ id }) => id === group.id);
	}
	public getColorGroup(x: number, y: number): ColorGroup | undefined {
		return this.groups.find(({ pixels }) =>
			pixels.some((pixel) => pixel.x === x && pixel.y === y)
		);
	}
	public getPixelColor(x: number, y: number): string | undefined {
		return this.groups.find(({ pixels }) =>
			pixels.some((pixel) => pixel.x === x && pixel.y === y)
		)?.hex;
	}
	public toData(): CrossStitchPatternData {
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
	public getFinishedDimensions(ct: number) {
		return {
			widthIn: (this.width / ct).toFixed(1),
			widthCm: ((this.width / ct) * 2.54).toFixed(1),
			heightIn: (this.height / ct).toFixed(1),
			heightCm: ((this.height / ct) * 2.54).toFixed(1),
		};
	}
}
