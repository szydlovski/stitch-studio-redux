'use client';
import {
	CrossStitchPattern,
	CrossStitchPatternData,
} from '@domain/cross-stitch';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	ReactNode,
	RefObject,
	createContext,
	useContext,
	useMemo,
	useReducer,
	useRef,
} from 'react';
import {
	CrossStitchEditorState,
	crossStitchEditorStateReducer,
	getInitialCrossStitchEditorState,
} from './crossStitchEditorReducer';

interface CrossStitchEditorContextType {
	canvasRef: RefObject<HTMLCanvasElement>;
	containerRef: RefObject<HTMLDivElement>;
	state: CrossStitchEditorState;
	dispatch: React.Dispatch<PayloadAction<any>>;
}

const CrossStitchEditorContext = createContext<
	CrossStitchEditorContextType | undefined
>(undefined);

const loadCrossStitchEditorStateFromPatternData = (
	data: CrossStitchPatternData
): CrossStitchEditorState => {
	const pattern = CrossStitchPattern.fromSerialized(data);
	return {
		...getInitialCrossStitchEditorState(),
		stitches: pattern.getStitches().map((stitch) => ({
			...stitch,
			x: stitch.x - Math.round(pattern.width / 2),
			y: stitch.y - Math.round(pattern.height / 2),
		})),
		colors: pattern.getColors(),
	};
};

export const CrossStitchEditorProvider = ({
	children,
	patternData,
}: {
	children: ReactNode;
	patternData: CrossStitchPatternData;
}) => {
	const [state, dispatch] = useReducer(
		crossStitchEditorStateReducer,
		loadCrossStitchEditorStateFromPatternData(patternData)
	);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	return (
		<CrossStitchEditorContext.Provider
			value={{ state, dispatch, canvasRef, containerRef }}
		>
			{children}
		</CrossStitchEditorContext.Provider>
	);
};

export const useCrossStitchEditorContext = () => {
	const context = useContext(CrossStitchEditorContext);
	if (!context) {
		throw new Error(
			'useCrossStitchEditorContext must be used within a CrossStitchEditorProvider'
		);
	}
	return context;
};
