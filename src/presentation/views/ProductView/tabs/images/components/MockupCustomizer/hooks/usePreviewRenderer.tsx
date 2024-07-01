import { useRendererContext } from '@components/context/RendererContext';
import { CrossStitchPattern } from '@domain/cross-stitch';
import debounce from 'lodash.debounce';
import { RefObject, useEffect, useMemo } from 'react';
import { CoverConfig } from '../../CoverGenerator/coverConfigReducer';
import { renderHoopMockup } from '@brand/StitchFairyCo';
import { HoopMockupConfig } from '@domain/product/types';

export const useHoopRenderer = ({
	pattern,
	state,
	canvasRef,
	debounce: wait = 200,
}: {
	pattern: CrossStitchPattern;
	state: HoopMockupConfig;
	canvasRef: RefObject<HTMLCanvasElement>;
	debounce?: number;
}) => {
	const rendererContext = useRendererContext();
	const debouncedRender = useMemo(
		() =>
			debounce((config: HoopMockupConfig) => {
				const ctx = canvasRef.current?.getContext('2d');
				if (!ctx) return;

				renderHoopMockup(
					{
						pattern,
						config,
						context: rendererContext,
					},
					ctx
				);
			}, wait),
		[canvasRef, pattern, rendererContext, wait]
	);
	useEffect(() => debouncedRender(state), [state, debouncedRender]);
};
