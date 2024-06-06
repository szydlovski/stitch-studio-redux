'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ColorKey =
	| 'background'
	| 'fabric'
	| 'frame'
	| 'pinterestBar'
	| 'floss1'
	| 'floss2'
	| 'floss3'
	| 'floss4'
	| 'floss5';

export interface CoverGeneratorState {
	colors: Record<ColorKey, string>;
	padding: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	paddingOptions: {
		scale: number;
		xOffset: number;
		yOffset: number;
	};
}

export type CoverGeneratorAction = ReturnType<
	(typeof CoverGeneratorActions)[keyof typeof CoverGeneratorActions]
>;

export const {
	actions: CoverGeneratorActions,
	reducer: coverGeneratorReducer,
} = createSlice({
	name: 'coverGenerator',
	initialState: (): CoverGeneratorState => ({
		colors: {
			background: '',
			fabric: '',
			frame: '',
			pinterestBar: '',
			floss1: '',
			floss2: '',
			floss3: '',
			floss4: '',
			floss5: '',
		},
		padding: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		paddingOptions: {
			scale: 0.3,
			xOffset: 0,
			yOffset: 0,
		},
	}),
	reducers: {
		setColor(state, action: PayloadAction<{ key: ColorKey; value: string }>) {
			state.colors[action.payload.key] = action.payload.value;
		},
		setPadding(
			state,
			action: PayloadAction<
				Partial<{
					top: number;
					bottom: number;
					left: number;
					right: number;
				}>
			>
		) {
			state.padding = { ...state.padding, ...action.payload };
		},
		setPaddingOptions(
			state,
			action: PayloadAction<Partial<CoverGeneratorState['paddingOptions']>>
		) {
			state.paddingOptions = { ...state.paddingOptions, ...action.payload };
		},
		setState(state, action: PayloadAction<Partial<CoverGeneratorState>>) {
			Object.assign(state, action.payload);
		},
	},
});
