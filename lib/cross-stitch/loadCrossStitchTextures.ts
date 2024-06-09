import { loadImage } from '../canvas';
import { StylizedPatternTextureDictionary } from './types';

export const loadStitchTextureDictionary =
	async (): Promise<StylizedPatternTextureDictionary> => ({
		aida: await loadImage('/assets/aida_texture.png'),
		stitch_base: await loadImage('/assets/stitch_01_base.png'),
		stitch_soft_light: await loadImage('/assets/stitch_02_soft-light.png'),
		stitch_overlay: await loadImage('/assets/stitch_03_overlay2.png'),
	});
