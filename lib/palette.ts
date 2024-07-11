import DMC_COLORS from '@/public/palettes/dmc.json';

export interface PaletteColor<Meta = Record<string, string>> {
	name: string;
	color: string;
	meta: Meta;
}

export interface PaletteManifest<Meta = Record<string, string>> {
	name: string;
	colors: PaletteColor<Meta>[];
}

export interface DMCMeta {
	number: string;
	name: string;
	row: string;
}

const DMC_PALETTE: PaletteManifest<DMCMeta> = {
	name: 'DMC',
	colors: DMC_COLORS,
};

export const PALETTES = { DMC: DMC_PALETTE };
