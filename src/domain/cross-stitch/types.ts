import { Drawable } from '@lib/canvas';

export type ColorGroup = {
	id: string;
	hex: string;
	pixels: { x: number; y: number }[];
};

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

export interface CrossStitchPatternData {
	readonly width: number;
	readonly height: number;
	readonly groups: ColorGroup[];
}
