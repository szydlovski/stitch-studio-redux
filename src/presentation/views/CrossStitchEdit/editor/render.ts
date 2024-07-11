import { CrossStitchPattern, FlossColor } from '@domain/cross-stitch';
import { CrossStitchEditorState } from './crossStitchEditorReducer';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

interface RenderProps {
	ctx: CanvasRenderingContext2D;
	state: CrossStitchEditorState;
	options?: Partial<RenderOptions>;
}

interface RenderOptions {
	grids: GridConfig[];
	theme: 'light' | 'dark';
}

interface GridConfig {
	unit: number;
	width: number;
	alpha?: number;
	minScale?: number;
}

const DEFAULT_GRIDS: GridConfig[] = [
	{ unit: 50, alpha: 0.1, width: 1 },
	{ unit: 10, alpha: 0.1, width: 1 },
	{ unit: 5, alpha: 0.1, width: 1, minScale: 2 },
	{ unit: 1, alpha: 0.1, width: 1, minScale: 5 },
];

export const render = (props: RenderProps) => {
	const {
		ctx,
		state: {
			scale,
			offsetX,
			offsetY,
			pixelX,
			pixelY,
			activeColorId: activeColor,
			canvasWidth,
			canvasHeight,
			stitches,
			colors,
		},
		options: { theme = 'dark', grids = DEFAULT_GRIDS } = {},
	} = props;
	const { canvas } = ctx;
	const colorMap: Record<string, FlossColor> = Object.fromEntries(
		colors.map((c) => [c.id, c])
	);

	// Resize & clear canvas
	if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	// Draw stitches
	ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
	for (const { x, y, colorId } of stitches) {
		const hex = colorMap[colorId].color;
		if (hex !== undefined) {
			ctx.fillStyle = hex;
			ctx.fillRect(x * scale, y * scale, scale, scale);
		}
	}
	ctx.resetTransform();

	// Draw grids
	const maxGridPixelSize = Math.max(...grids.map((g) => g.unit)) * scale;
	ctx.translate(
		canvas.width / 2 + (offsetX % maxGridPixelSize),
		canvas.height / 2 + (offsetY % maxGridPixelSize)
	);

	for (const { unit, alpha, width, minScale } of grids) {
		if (minScale !== undefined && scale < minScale) continue;
		ctx.strokeStyle = fullConfig.theme.colors.border;
		ctx.globalAlpha = alpha ?? 1;
		ctx.lineWidth = width;
		drawGrid(ctx, unit * scale, maxGridPixelSize);
	}
	ctx.resetTransform();
	ctx.globalAlpha = 1;

	// Draw active pixel
	ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
	if (activeColor !== undefined) {
		const activeHex = colorMap[activeColor].color;
		ctx.fillStyle = activeHex;
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 2;
		ctx.fillRect(pixelX * scale, pixelY * scale, scale, scale);
		ctx.strokeRect(pixelX * scale, pixelY * scale, scale, scale);
	} else {
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 2;
		ctx.strokeRect(pixelX * scale, pixelY * scale, scale, scale);
	}
	ctx.resetTransform();
};

export const renderGrids = ({
	ctx,
	state: { scale, offsetX, offsetY },
	options: { grids = DEFAULT_GRIDS } = {},
}: RenderProps) => {
	const { canvas } = ctx;

	// Draw grids
	const maxGridPixelSize = Math.max(...grids.map((g) => g.unit)) * scale;
	ctx.translate(
		canvas.width / 2 + (offsetX % maxGridPixelSize),
		canvas.height / 2 + (offsetY % maxGridPixelSize)
	);
	for (const { unit, alpha, width, minScale } of grids) {
		if (minScale !== undefined && scale < minScale) continue;
		ctx.strokeStyle = fullConfig.theme.colors.border;
		ctx.globalAlpha = alpha ?? 1;
		ctx.lineWidth = width;
		drawGrid(ctx, unit * scale, maxGridPixelSize);
	}
	ctx.resetTransform();
	ctx.globalAlpha = 1;
};

export const drawGrid = (
	ctx: CanvasRenderingContext2D,
	gridSize: number,
	maxGridPixelSize: number
) => {
	const canvas = ctx.canvas;
	const hSpace = canvas.width + maxGridPixelSize * 2;
	const vSpace = canvas.height + maxGridPixelSize * 2;
	const hGuideCount = Math.max(2, Math.ceil(Math.ceil(hSpace / gridSize) / 2));
	const vGuideCount = Math.max(2, Math.ceil(Math.ceil(vSpace / gridSize) / 2));
	for (let i = -hGuideCount; i <= hGuideCount; i++) {
		ctx.beginPath();
		ctx.moveTo(i * gridSize, -vSpace / 2);
		ctx.lineTo(i * gridSize, vSpace / 2);
		ctx.stroke();
	}
	for (let i = -vGuideCount; i <= vGuideCount; i++) {
		ctx.beginPath();
		ctx.moveTo(-hSpace / 2, i * gridSize);
		ctx.lineTo(hSpace / 2, i * gridSize);
		ctx.stroke();
	}
};
