import { Padding, PaddingOpts } from './types';

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
