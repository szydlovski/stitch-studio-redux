import { Drawable } from '../canvas';

export type RGBTuple = [number, number, number];

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
	Fabric = 'fabric',
	StitchBase = 'stitch_base',
	StitchSoftLight = 'stitch_soft_light',
	StitchOverlay = 'stitch_overlay',
}

export type StylizedPatternTextureDictionary = Record<
	StylizedPatternLayers,
	Drawable
>;
