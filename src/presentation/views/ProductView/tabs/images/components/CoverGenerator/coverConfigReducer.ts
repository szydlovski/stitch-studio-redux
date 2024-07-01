import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export interface CoverConfig<ColorKey extends string = string> {
	colors: Record<ColorKey, string>;
	scale: number;
	xOffset: number;
	yOffset: number;
}

export const CoverConfigSchema = z.object({
	colors: z.record(z.string()),
	scale: z.number().min(0).max(1),
	xOffset: z.number(),
	yOffset: z.number(),
});

export type CoverConfigAction = ReturnType<
	(typeof CoverConfigActions)[keyof typeof CoverConfigActions]
>;

export const {
	actions: CoverConfigActions,
	reducer: coverConfigReducer,
	getInitialState: getCoverConfigInitialState,
} = createSlice({
	name: 'coverGenerator',
	initialState: (): CoverConfig => ({
		scale: 0.5,
		xOffset: 0,
		yOffset: 0,
		colors: {},
	}),
	reducers: {
		setColor(state, action: PayloadAction<{ key: string; value: string }>) {
			state.colors[action.payload.key] = action.payload.value;
		},
		setXOffset(state, action: PayloadAction<number>) {
			state.xOffset = action.payload;
		},
		setYOffset(state, action: PayloadAction<number>) {
			state.yOffset = action.payload;
		},
		setScale(state, action: PayloadAction<number>) {
			state.scale = action.payload;
		},
		setState(state, action: PayloadAction<Partial<CoverConfig>>) {
			Object.assign(state, action.payload);
		},
		reset(state) {
			Object.assign(state, getCoverConfigInitialState());
		},
	},
});
