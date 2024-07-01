'use client';
import { CrossStitchPattern } from '@domain/cross-stitch';
import { useEffect, useReducer, useRef } from 'react';
import { useHoopRenderer } from './hooks/usePreviewRenderer';
import { PaddingOptionsInput } from '../CoverCustomizer/components/PaddingOptionsInput';
import { ColorPicker } from '../CoverCustomizer/components/ColorPicker';
import { HoopMockupConfig } from '@domain/product/types';
import { MockupCustomizerActions } from './mockupCustomizerReducer';

export const MockupCustomizer = ({
	state,
	dispatch,
	pattern,
}: {
	state: HoopMockupConfig;
	dispatch: React.Dispatch<any>;
	pattern: CrossStitchPattern;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const { scale, xOffset, yOffset } = state;

	useHoopRenderer({ pattern, state, canvasRef, debounce: 50 });

	return (
		<div className="grid gap-4">
			<div className="flex justify-center">
				<canvas
					ref={canvasRef}
					className=" max-w-[500px]"
					width={1100}
					height={1180}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4 h-[200px]">
				<div className="border rounded-md h-full">
					<PaddingOptionsInput
						value={{ scale, xOffset, yOffset }}
						onValueChange={(options) =>
							dispatch(MockupCustomizerActions.assign(options))
						}
					/>
				</div>
				<div className="border rounded-md h-full ">
					<ColorPicker
						value={state.background}
						onChange={(color) =>
							dispatch(MockupCustomizerActions.setBackground(color))
						}
						palette={['#242424', '#fefefe']}
					/>
				</div>
			</div>
		</div>
	);
};
