export enum PaletteUrls {
	DMC = '/palettes/dmc.json',
}

export interface PaletteColor {
	label: string;
	color: string;
	vendor: string;
	meta: Record<string, string>;
}

export interface PaletteManifest {
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
