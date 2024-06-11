import { useRendererContext } from '@/presentation/components/context/RendererContext';
import { CrossStitchPattern } from '@/domain/cross-stitch';
import debounce from 'lodash.debounce';
import { RefObject, useEffect, useMemo } from 'react';
import { CoverConfig } from '../../CoverGenerator/coverConfigReducer';

export const usePreviewRenderer = ({
	pattern,
	state,
	canvasRef,
	render,
	debounce: wait = 50,
}: {
	pattern: CrossStitchPattern;
	state: CoverConfig;
	canvasRef: RefObject<HTMLCanvasElement>;
	render: (props: any, ctx: CanvasRenderingContext2D) => void;
	debounce?: number;
}) => {
	const rendererContext = useRendererContext();
	const debouncedRender = useMemo(
		() =>
			debounce((config: CoverConfig) => {
				const ctx = canvasRef.current?.getContext('2d');
				if (!ctx) return;

				render(
					{
						pattern,
						config,
						context: rendererContext,
					},
					ctx
				);
			}, wait),
		[]
	);
	useEffect(() => debouncedRender(state), [state]);
};
