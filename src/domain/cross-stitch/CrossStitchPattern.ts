import { CrossStitchPatternData, Stitch, FlossColor } from './types';
export class CrossStitchPattern {
	private constructor(
		public readonly width: number,
		public readonly height: number,
		public readonly colors: FlossColor[],
		public readonly stitches: Stitch[]
	) {}
	static fromSerialized({
		width,
		height,
		colors,
		stitches,
	}: CrossStitchPatternData): CrossStitchPattern {
		return new CrossStitchPattern(width, height, colors, stitches);
	}
	private getDataArrayIndex({ x, y }: { x: number; y: number }): number {
		return y * this.width + x;
	}
	public getStitches(): Stitch[] {
		return this.stitches;
	}
	public getColors(): FlossColor[] {
		return this.colors;
	}
	public getColorIndex(color: FlossColor): number {
		return this.colors.findIndex(({ id }) => id === color.id);
	}
	public getFlossAt(x: number, y: number): FlossColor | undefined {
		const stitch = this.stitches.find((s) => s.x === x && s.y === y);
		if (!stitch) return;
		return this.colors.find(({ id }) => id === stitch.colorId);
	}
	public getPixelColor(x: number, y: number): string | undefined {
		return this.getFlossAt(x, y)?.color;
	}
	public toSerializable(): CrossStitchPatternData {
		const { width, height, colors, stitches } = this;
		return { width, height, colors, stitches };
	}
	public serialize(): string {
		return JSON.stringify(this.toSerializable());
	}
	// utility getters
	get dimensionsText(): string {
		return `${this.width} x ${this.height}`;
	}
	get colorCount(): number {
		return this.colors.length;
	}
	get stitchCount(): number {
		return this.stitches.length;
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
