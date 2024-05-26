import { loadImage } from '../canvas';
import {
	Padding,
	PaddingOpts,
	StylizedPatternTextureDictionary,
} from './types';

export const loadStitchTextureDictionary =
	async (): Promise<StylizedPatternTextureDictionary> => ({
		aida: await loadImage('/assets/aida_texture.png'),
		stitch_base: await loadImage('/assets/stitch_01_base.png'),
		stitch_soft_light: await loadImage('/assets/stitch_02_soft-light.png'),
		stitch_overlay: await loadImage('/assets/stitch_03_overlay2.png'),
	});

export const resolvePaddingOpts = (options: PaddingOpts): Padding => {
	if (typeof options === 'number') {
		const n = options;
		return { left: n, top: n, right: n, bottom: n };
	} else if (Array.isArray(options)) {
		const [h, v] = options;
		return { left: h, top: v, right: h, bottom: v };
	} else {
		const { left, top, right, bottom } = options;
		return { left, top, right, bottom };
	}
};
