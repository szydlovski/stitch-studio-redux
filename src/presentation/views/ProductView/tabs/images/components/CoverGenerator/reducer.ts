import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CoverConfig } from './coverConfigReducer';

export interface CoverRenderState {
	key: string;
	width: number;
	height: number;
	src: string;
	uploaded?: boolean;
	uploading?: boolean;
	error?: boolean;
	errorMessage?: string;
}

export interface CoverGeneratorState {
	coverConfig: CoverConfig;
	lastCoverConfig?: CoverConfig;
	renders: CoverRenderState[];
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
		renders: [],
		coverConfig: {
			scale: 0.3,
			xOffset: 0,
			yOffset: 0,
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
		},
	}),
	reducers: {
		setState(state, action: PayloadAction<Partial<CoverGeneratorState>>) {
			Object.assign(state, action.payload);
		},
		updateCoverConfig(state, action: PayloadAction<Partial<CoverConfig>>) {
			Object.assign(state.coverConfig, action.payload);
		},
	},
});
