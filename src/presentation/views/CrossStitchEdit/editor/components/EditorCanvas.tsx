'use client';
import { useCallback, useEffect, useRef, MouseEvent } from 'react';
import { useCrossStitchEditorContext } from '../CrossStitchEditorContext';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_WHEEL_FACTOR } from '../constants';
import {
	CrossStitchEditorActions,
	CrossStitchEditorState,
	CrossStitchEditorTool,
} from '../crossStitchEditorReducer';

const getMousePosition = (evt: MouseEvent) => {
	const rect = evt.currentTarget.getBoundingClientRect();
	return { x: evt.clientX - rect.x, y: evt.clientY - rect.y };
};

const getPixelPosition = (
	mouseX: number,
	mouseY: number,
	state: CrossStitchEditorState
) => {
	const { scale, offsetX, offsetY, canvasWidth, canvasHeight } = state;
	const x = Math.floor(-offsetX / scale + (mouseX - canvasWidth / 2) / scale);
	const y = Math.floor(-offsetY / scale + (mouseY - canvasHeight / 2) / scale);
	return { x, y };
};

export const EditorCanvas = () => {
	const { canvasRef, state, dispatch } = useCrossStitchEditorContext();

	// console.log('dimensions', dimensions);

	const mousePosRef = useRef<[number, number]>([0, 0]);
	const dragTool = useRef<CrossStitchEditorTool>();
	const dragStart = useRef<[number, number]>([0, 0]);

	const minOffsetX = (-500 / 4) * state.scale;
	const maxOffsetX = (500 / 4) * state.scale;
	const minOffsetY = (-500 / 4) * state.scale;
	const maxOffsetY = (500 / 4) * state.scale;

	const handleWheel = useCallback(
		(evt: WheelEvent) => {
			evt.stopPropagation();
			evt.preventDefault();
			const isZoomOut = evt.deltaY > 0;

			// When ctrl is pressed, zoom 5 times faster
			const strength = 1 + (evt.ctrlKey ? 5 : 1) * ZOOM_WHEEL_FACTOR;
			const zoomFactor = isZoomOut ? 1 / strength : strength;

			const newScale = Math.max(
				MIN_ZOOM,
				Math.min(MAX_ZOOM, state.scale * zoomFactor)
			);
			dispatch(CrossStitchEditorActions.setScale(newScale));

			const actualZoomFactor = newScale / state.scale;
			dispatch(
				CrossStitchEditorActions.setOffset([
					state.offsetX * actualZoomFactor,
					state.offsetY * actualZoomFactor,
				])
			);
		},
		[state, dispatch]
	);

	const handleMouseDown = useCallback(
		(evt: MouseEvent) => {
			if (![0, 1].includes(evt.button)) return;
			const { x: mouseX, y: mouseY } = getMousePosition(evt);
			const { x: pixelX, y: pixelY } = getPixelPosition(mouseX, mouseY, state);
			if (evt.button === 0) {
				if (state.tool === CrossStitchEditorTool.Pencil) {
					dragStart.current = [mouseX, mouseY];
					dragTool.current = CrossStitchEditorTool.Pencil;
					dispatch(CrossStitchEditorActions.draw({ x: pixelX, y: pixelY }));
				} else if (state.tool === CrossStitchEditorTool.Eraser) {
					dragStart.current = [mouseX, mouseY];
					dragTool.current = CrossStitchEditorTool.Eraser;
					dispatch(CrossStitchEditorActions.erase({ x: pixelX, y: pixelY }));
				} else if (state.tool === CrossStitchEditorTool.Mouse) {
					dragStart.current = [mouseX, mouseY];
					dragTool.current = CrossStitchEditorTool.Mouse;
				}
			} else if (evt.button === 1) {
				dragStart.current = [mouseX, mouseY];
				dragTool.current = CrossStitchEditorTool.Mouse;
			} else {
				return;
			}
		},
		[state, dispatch]
	);

	const handleMouseMove = useCallback(
		(evt: MouseEvent) => {
			const { x: mouseX, y: mouseY } = getMousePosition(evt);
			const { x: pixelX, y: pixelY } = getPixelPosition(mouseX, mouseY, state);
			dispatch(CrossStitchEditorActions.setMousePosition([mouseX, mouseY]));
			mousePosRef.current = [mouseX, mouseY];
			if (!dragTool.current) return;
			switch (dragTool.current) {
				case CrossStitchEditorTool.Pencil: {
					dispatch(CrossStitchEditorActions.draw({ x: pixelX, y: pixelY }));
					break;
				}
				case CrossStitchEditorTool.Eraser: {
					dispatch(CrossStitchEditorActions.erase({ x: pixelX, y: pixelY }));
					break;
				}
				case CrossStitchEditorTool.Mouse: {
					const [dx, dy] = [
						mouseX - dragStart.current[0],
						mouseY - dragStart.current[1],
					];
					dragStart.current = [mouseX, mouseY];
					// setOffset(([ox, oy]) => [ox + dx, oy + dy]);
					dispatch(
						CrossStitchEditorActions.setOffset([
							Math.max(minOffsetX, Math.min(maxOffsetX, state.offsetX + dx)),
							Math.max(minOffsetY, Math.min(maxOffsetY, state.offsetY + dy)),
						])
					);
					break;
				}
			}
		},
		[state, dispatch, minOffsetX, maxOffsetX, minOffsetY, maxOffsetY]
	);

	const handleMouseUp = useCallback((_: MouseEvent) => {
		dragTool.current = undefined;
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.addEventListener('wheel', handleWheel);
		return () => {
			canvas.removeEventListener('wheel', handleWheel);
		};
	}, [handleWheel, canvasRef]);
	return (
		<canvas
			ref={canvasRef}
			width={512}
			height={512}
			className="bg-muted/20 w-full h-full cursor-none"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		/>
	);
};
