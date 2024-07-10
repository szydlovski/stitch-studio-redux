import { Drawable } from '@lib/canvas';

export interface Padding {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

export type PaddingOpts = number | [number, number] | Padding;

export enum StylizedPatternLayers {
	Aida = 'aida',
	StitchBase = 'stitch_base',
	StitchSoftLight = 'stitch_soft_light',
	StitchOverlay = 'stitch_overlay',
}

export type StylizedPatternTextureDictionary = Record<
	StylizedPatternLayers,
	Drawable
>;

export interface FlossColor {
	id: string;
	name: string;
	color: string;
	palette: string;
	symbol: string;
}

export interface Stitch {
	colorId: string;
	x: number;
	y: number;
}

export interface CrossStitchPatternData {
	readonly width: number;
	readonly height: number;
	readonly stitches: Stitch[];
	readonly colors: FlossColor[];
}