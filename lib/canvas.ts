export type Drawable = HTMLImageElement | HTMLCanvasElement;
type DrawCallback = (ctx: CanvasRenderingContext2D) => any;
type SizeSource =
	| Drawable
	| { width: number; height: number }
	| [number, number]
	| number;

export function loadImage(path: string): Promise<HTMLImageElement> {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = path;
		img.onload = () => resolve(img);
	});
}

export function createBrowserCanvas(width: number, height: number) {
	const canvas = document.createElement('canvas');
	(canvas.width = width), (canvas.height = height);
	return canvas;
}

export function createCanvas(source: SizeSource, draw?: DrawCallback) {
	let width, height;
	const isArray = Array.isArray(source);
	if (typeof source === 'number') {
		(width = source), (height = source);
	} else if (
		isArray &&
		Number.isInteger(source[0]) &&
		Number.isInteger(source[1])
	) {
		[width, height] = source;
	} else if (
		!isArray &&
		Number.isInteger(source.width) &&
		Number.isInteger(source.height)
	) {
		({ width, height } = source);
	} else {
		throw new Error('No valid size source for canvas');
	}
	const canvas = createBrowserCanvas(width, height);
	const ctx = canvas.getContext('2d')!;
	if (draw) draw(ctx);
	return canvas;
}

type AspectRatio = `${number}:${number}`;

export function cropCanvas(
	canvas: HTMLCanvasElement,
	ratio: AspectRatio = '1:1'
) {
	const { width: sourceWidth, height: sourceHeight } = canvas;
	const widthRatio = parseInt(ratio.split(':')[0]);
	const heightRatio = parseInt(ratio.split(':')[1]);
	let targetWidth: number, targetHeight: number;
	if (widthRatio > heightRatio) {
		targetWidth = sourceWidth;
		targetHeight = sourceWidth * (heightRatio / widthRatio);
		if (targetHeight > sourceHeight) {
			targetWidth = sourceHeight * (widthRatio / heightRatio);
			targetHeight = sourceHeight;
		}
	} else if (widthRatio < heightRatio) {
		targetWidth = sourceHeight * (widthRatio / heightRatio);
		targetHeight = sourceHeight;
		if (targetWidth > sourceWidth) {
			targetWidth = sourceWidth;
			targetHeight = sourceWidth * (heightRatio / widthRatio);
		}
	} else {
		const smallerDimension =
			sourceWidth < sourceHeight ? sourceWidth : sourceHeight;
		targetWidth = smallerDimension;
		targetHeight = smallerDimension;
	}
	targetWidth = Math.round(targetWidth);
	targetHeight = Math.round(targetHeight);
	return createCanvas([targetWidth, targetHeight], (ctx) => {
		const x = (targetWidth - sourceWidth) / 2;
		const y = (targetHeight - sourceHeight) / 2;
		ctx.drawImage(canvas, x, y);
	});
}

interface Point {
	x: number;
	y: number;
}

export function copyCanvas(canvas: Drawable) {
	return createCanvas(canvas, (ctx) => ctx.drawImage(canvas, 0, 0));
}

export function trimCanvas(source: Drawable) {
	// to allow trimming images, copy source to a new canvas
	const sourceCanvas = copyCanvas(source);
	const sourceContext = sourceCanvas.getContext('2d', {
		willReadFrequently: true,
	})!;
	const { width: sourceWidth, height: sourceHeight } = sourceCanvas;

	const pixels = sourceContext.getImageData(
		0,
		0,
		sourceWidth,
		sourceHeight
	).data;

	// looking for x and y boundaries
	let minX = sourceWidth,
		maxX = 0,
		minY = sourceHeight,
		maxY = 0;

	// loop through all the pixels
	for (let y = 0; y < sourceHeight; y++) {
		for (let x = 0; x < sourceWidth; x++) {
			const alphaIndex = y * 4 * sourceWidth + x * 4 + 3;
			const alpha = pixels[alphaIndex];
			// if it's not transparent, check if it's a new boundary
			if (alpha > 0) {
				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
			}
		}
	}

	// +1 to keep the boundary pixels
	const targetWidth = maxX - minX + 1,
		targetHeight = maxY - minY + 1;

	const trimmedImageData = sourceContext.getImageData(
		minX,
		minY,
		targetWidth,
		targetHeight
	);

	return createCanvas([targetWidth, targetHeight], (ctx) =>
		ctx.putImageData(trimmedImageData, 0, 0)
	);
}

export function rotateImage(
	image: Drawable,
	rotation: number
): HTMLCanvasElement {
	const rotatePoint = (pivot: Point, point: Point, angle: number) => {
		const diffX = point.x - pivot.x;
		const diffY = point.y - pivot.y;
		const distance = Math.sqrt(diffX * diffX + diffY * diffY);
		angle += Math.atan2(diffY, diffX);
		return {
			x: pivot.x + distance * Math.cos(angle),
			y: pivot.y + distance * Math.sin(angle),
		};
	};
	const getRotatedDimensions = (image: Drawable, rotation: number) => {
		const { width, height } = image;
		const pivot = {
			x: width / 2,
			y: height / 2,
		};

		const c1 = rotatePoint(pivot, { x: 0, y: 0 }, rotation);
		const c2 = rotatePoint(pivot, { x: 0, y: height }, rotation);
		const c3 = rotatePoint(pivot, { x: width, y: 0 }, rotation);
		const c4 = rotatePoint(pivot, { x: width, y: height }, rotation);

		const bx1 = Math.min(c1.x, c2.x, c3.x, c4.x);
		const by1 = Math.min(c1.y, c2.y, c3.y, c4.y);
		const bx2 = Math.max(c1.x, c2.x, c3.x, c4.x);
		const by2 = Math.max(c1.y, c2.y, c3.y, c4.y);

		return {
			width: Math.ceil(bx2 - bx1),
			height: Math.ceil(by2 - by1),
		};
	};
	rotation = (rotation * Math.PI) / 180;
	const dimensions = getRotatedDimensions(image, rotation);
	return createCanvas(dimensions, (ctx) => {
		ctx.translate(dimensions.width / 2, dimensions.height / 2);
		ctx.rotate(rotation);
		ctx.drawImage(image, -image.width / 2, -image.height / 2);
	});
}

export function maskCanvas(image: Drawable, mask: Drawable): HTMLCanvasElement {
	return createCanvas(image, (ctx) => {
		ctx.drawImage(mask, 0, 0);
		ctx.globalCompositeOperation = 'source-in';
		ctx.drawImage(image, 0, 0);
	});
}

export function compoundCanvas(
	source: Drawable,
	repeat = 5
): HTMLCanvasElement {
	return createCanvas(source, (ctx) => {
		for (let i = 0; i < repeat; i++) {
			ctx.drawImage(source, 0, 0);
		}
	});
}

export function repeatTile(
	tile: Drawable,
	width: number,
	height: number,
	size: number
) {
	return compoundCanvas(
		createCanvas([width * size, height * size], (ctx) => {
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					ctx.drawImage(tile, x * size, y * size, size, size);
				}
			}
		})
	);
}
