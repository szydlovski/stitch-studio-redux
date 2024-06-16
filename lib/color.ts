export type RGBTuple = [number, number, number];

export const rgbToHex = ([r, g, b]: RGBTuple): string =>
	`#${[r, g, b].reduce(
		(str, comp) => str + comp.toString(16).padStart(2, '0'),
		''
	)}`;

export const hexToRgb = (hex: string): RGBTuple => {
	const [r, g, b] = hex
		.replace(/^#/, '')
		.match(/.{1,2}/g)!
		.map((comp) => parseInt(comp, 16));
	return [r, g, b];
};
