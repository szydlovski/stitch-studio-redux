import { Pattern } from './pattern/pattern';
import { Padding } from './pattern/types';

export const readImageFileAsDataURL = (file: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

export const loadImageFromDataUrl = (
	dataUrl: string
): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const img = Object.assign(document.createElement('img'), {
			src: dataUrl,
		});
		img.onload = () => resolve(img);
		img.onerror = reject;
	});

export const readImageFromFile = (file: Blob): Promise<HTMLImageElement> =>
	readImageFileAsDataURL(file).then((src) => loadImageFromDataUrl(src));

export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
	new Promise((resolve, reject) =>
		canvas.toBlob((blob) => (blob === null ? reject() : resolve(blob)))
	);

export const getSquarePadding = (pattern: Pattern, scale = 0.1): Padding => {
	const size = Math.round(
		Math.max(pattern.width, pattern.height) * (1 + scale)
	);
	const vPadding = size - pattern.height;
	const hPadding = size - pattern.width;
	const top = vPadding - Math.round(vPadding / 2);
	const bottom = vPadding - top;
	const left = hPadding - Math.round(hPadding / 2);
	const right = hPadding - left;
	return { left, top, right, bottom };
};
