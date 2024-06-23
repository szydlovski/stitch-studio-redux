'use client';
import useResizeObserver from '@react-hook/resize-observer';
import { useEffect, useState } from 'react';
import {
	CrossStitchEditorProvider,
	useCrossStitchEditorContext,
} from './CrossStitchEditorContext';
import { ColorsPanel } from './components/ColorsPanel';
import { DevPanel } from './components/DevPanel';
import { EditorCanvas } from './components/EditorCanvas';
import { ToolsPanel } from './components/ToolsPanel';
import { CrossStitchEditorActions } from './crossStitchEditorReducer';
import { render } from './render';

export const EditorInner = () => {
	const [ready, setReady] = useState(false);
	const { canvasRef, containerRef, state, dispatch } =
		useCrossStitchEditorContext();
	useResizeObserver(containerRef, ({ contentRect }) => {
		const { width, height } = contentRect;
		dispatch(CrossStitchEditorActions.setCanvasDimensions([width, height]));
	});
	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');
		if (!ctx) {
			console.log('no ctx');

			return;
		}
		render({ ctx, state, options: { theme: 'dark' } });
		console.log('rendered');

		setReady(true);
	}, [state, canvasRef]);
	return (
		<>
			<div ref={containerRef} className="h-[calc(100vh-56px)]">
				<EditorCanvas />
			</div>
			<ColorsPanel />
			<DevPanel />
			<ToolsPanel />
			{!ready && (
				<div className="absolute top-0 w-full h-full bg-red-500">
					loading...
				</div>
			)}
		</>
	);
};

import { CrossStitchPatternData } from '@domain/cross-stitch';

export const CrossStitchEditor = ({
	patternData,
}: {
	patternData: CrossStitchPatternData;
}) => {
	return (
		<CrossStitchEditorProvider patternData={patternData}>
			<EditorInner />
		</CrossStitchEditorProvider>
	);
};
