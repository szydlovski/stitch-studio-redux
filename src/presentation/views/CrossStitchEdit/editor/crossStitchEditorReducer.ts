import { Stitch, FlossColor } from '@domain/cross-stitch';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum CrossStitchEditorTool {
	Pencil = 'pencil',
	Bucket = 'bucket',
	Mouse = 'mouse',
	Eraser = 'eraser',
}

export interface CrossStitchEditorState {
	stitches: Stitch[];
	colors: FlossColor[];
	activeColor?: string;
	canvasWidth: number;
	canvasHeight: number;
	scale: number;
	offsetX: number;
	offsetY: number;
	mouseX: number;
	mouseY: number;
	pixelX: number;
	pixelY: number;
	tool: CrossStitchEditorTool;
}

export const {
	reducer: crossStitchEditorStateReducer,
	actions: CrossStitchEditorActions,
	getInitialState: getInitialCrossStitchEditorState,
} = createSlice({
	name: 'CrossStitchEditorState',
	initialState: (): CrossStitchEditorState => ({
		stitches: [],
		colors: [
			{
				id: 'black',
				name: 'Black',
				color: '#000000',
				palette: 'custom',
				symbol: 'X',
			},
		],
		tool: CrossStitchEditorTool.Mouse,
		activeColor: undefined,
		canvasWidth: 512,
		canvasHeight: 512,
		scale: 10,
		offsetX: 0,
		offsetY: 0,
		mouseX: 0,
		mouseY: 0,
		pixelX: 0,
		pixelY: 0,
	}),
	reducers: {
		setScale: (state, action: PayloadAction<number>) => {
			state.scale = action.payload;
		},
		setOffset: (state, action: PayloadAction<[number, number]>) => {
			const [x, y] = action.payload;
			state.offsetX = x;
			state.offsetY = y;
		},
		setOffsetX: (state, action: PayloadAction<number>) => {
			state.offsetX = action.payload;
		},
		setOffsetY: (state, action: PayloadAction<number>) => {
			state.offsetY = action.payload;
		},
		setMousePosition: (state, action: PayloadAction<[number, number]>) => {
			const [mouseX, mouseY] = action.payload;
			const { scale, offsetX, offsetY, canvasWidth, canvasHeight } = state;
			state.pixelX = Math.floor(
				-offsetX / scale + (mouseX - canvasWidth / 2) / scale
			);
			state.pixelY = Math.floor(
				-offsetY / scale + (mouseY - canvasHeight / 2) / scale
			);
			state.mouseX = mouseX;
			state.mouseY = mouseY;
		},
		setCanvasDimensions: (state, action: PayloadAction<[number, number]>) => {
			const [width, height] = action.payload;
			state.canvasWidth = width;
			state.canvasHeight = height;
		},
		setActiveColor: (state, action: PayloadAction<string | undefined>) => {
			state.activeColor = action.payload;
		},
		draw: (state, action: PayloadAction<{ x: number; y: number }>) => {
			if (state.activeColor === undefined) return;
			const existingStitch = state.stitches.find(
				({ x, y }) => x === action.payload.x && y === action.payload.y
			);
			if (existingStitch) {
				existingStitch.colorId = state.activeColor;
			} else {
				state.stitches.push({
					x: action.payload.x,
					y: action.payload.y,
					colorId: state.activeColor,
				});
			}
		},
		erase: (state, action: PayloadAction<{ x: number; y: number }>) => {
			state.stitches = state.stitches.filter(
				({ x, y }) => !(x === action.payload.x && y === action.payload.y)
			);
		},
		setTool: (state, action: PayloadAction<CrossStitchEditorTool>) => {
			state.tool = action.payload;
		},
	},
});
