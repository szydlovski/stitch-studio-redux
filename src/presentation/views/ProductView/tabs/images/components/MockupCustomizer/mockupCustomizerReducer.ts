import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CoverConfig } from '../CoverGenerator/coverConfigReducer';
import { HoopMockupConfig } from '@domain/product/types';


export type MockupCustomizerAction = ReturnType<
	(typeof MockupCustomizerActions)[keyof typeof MockupCustomizerActions]
>;

export const {
	actions: MockupCustomizerActions,
	reducer: mockupCustomizerReducer,
	getInitialState: getMockupCustomizerInitialState,
} = createSlice({
	name: 'mockupCustomizer',
	initialState: (): HoopMockupConfig => ({
		scale: 0.3,
		xOffset: 0,
		yOffset: 0,
		background: '#ffffff',
	}),
	reducers: {
		assign(state, action: PayloadAction<Partial<HoopMockupConfig>>) {
			Object.assign(state, action.payload);
		},
		reset(state) {
			Object.assign(state, getMockupCustomizerInitialState());
		},
		setScale(state, action: PayloadAction<number>) {
			state.scale = action.payload;
		},
		setXOffset(state, action: PayloadAction<number>) {
			state.xOffset = action.payload;
		},
		setYOffset(state, action: PayloadAction<number>) {
			state.yOffset = action.payload;
		},
		setBackground(state, action: PayloadAction<string>) {
			state.background = action.payload;
		},
	},
});
