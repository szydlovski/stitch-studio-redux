export type ColorTuple = [number, number, number];

export const rgbToHex = ([r, g, b]: ColorTuple): string =>
	`#${[r, g, b].reduce(
		(str, comp) => str + comp.toString(16).padStart(2, '0'),
		''
	)}`;

export const hexToRgb = (hex: string): ColorTuple => {
	const [r, g, b] = hex
		.replace(/^#/, '')
		.match(/.{1,2}/g)!
		.map((comp) => parseInt(comp, 16));
	return [r, g, b];
};

export const rgbToHsv = ([ir, ig, ib]: ColorTuple): ColorTuple => {
	const r = ir / 255;
	const g = ig / 255;
	const b = ib / 255;

	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s,
		v = max;

	let d = max - min;
	s = max == 0 ? 0 : d / max;

	if (max == min) {
		h = 0; // achromatic
	} else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return [h, s, v];
};
