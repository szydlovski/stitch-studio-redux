export enum PaletteUrls {
	DMC = '/palettes/dmc.json',
}

export interface DMCMeta {
	number: string;
	name: string;
	row: string;
}

export interface PaletteColor<Meta = Record<string, string>> {
	name: string;
	color: string;
	meta: Meta;
}

export interface PaletteManifest {
	name: string;
	colors: PaletteColor[];
}

class Palette {
	private colors: PaletteColor[];
	public constructor(manifest: PaletteManifest) {
		this.colors = manifest.colors;
	}
	public isPaletteColor(color: string): boolean {
		return this.colors.some((paletteColor) => paletteColor.color === color);
	}
}

export class PaletteService {
	public async loadPalette(url: string): Promise<PaletteManifest> {
		return fetch(url).then((response) => response.json());
	}
}
