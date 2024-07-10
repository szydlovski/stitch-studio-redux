import { useRendererContext } from '@components/context/RendererContext';
import { CrossStitchPattern } from '@domain/cross-stitch';
import debounce from 'lodash.debounce';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { CoverConfig } from '../../CoverGenerator/coverConfigReducer';
import {
	DedicatedRenderer,
	Template,
} from '@infrastructure/product-image/template-engine';
import { etsyCoverTemplate } from '@brand/StitchFairyCo/cover/templates';
import { createCanvas } from '@lib/canvas';

export const usePreviewRenderer = ({
	pattern,
	state,
	canvasRef,
	debounce: wait = 50,
	template,
}: {
	pattern: CrossStitchPattern;
	state: CoverConfig;
	canvasRef: RefObject<HTMLCanvasElement>;
	debounce?: number;
	template: Template;
}) => {
	const [renderer, setRenderer] = useState<DedicatedRenderer>();
	useEffect(
		() =>
			void (async () => {
				if (!canvasRef.current) return;
				const renderer = new DedicatedRenderer(template, canvasRef.current);
				await renderer.loadTextures();
				setRenderer(renderer);
			})(),
		[canvasRef]
	);
	const { crossStitchRenderer } = useRendererContext();
	const renderFn = useRef<(config: CoverConfig) => void>(() => {});
	useEffect(() => {
		renderFn.current = (config: CoverConfig) => {
			if (!renderer) return;
			const { colors, scale } = config;
			const side = Math.max(pattern.width, pattern.height);
			const embroideryMockup = createCanvas(template.dimensions, (ctx) => {
				const renderScale = 1 + scale * 2;
				const width = template.dimensions.width * renderScale;
				const height = template.dimensions.height * renderScale;
				ctx.drawImage(
					crossStitchRenderer.renderEmbroideryOnFabricMockup(
						pattern,
						5,
						{
							top: side,
							bottom: side,
							left: side,
							right: side,
						},
						colors.background
					),
					-width / 2 +
						template.dimensions.width / 2 +
						(config.xOffset / 1000) * width,
					-height / 2 +
						template.dimensions.height / 2 +
						(config.yOffset / 1000) * height,
					width,
					height
				);
			});
			console.time('render');
			renderer.render({
				color1: colors.floss1,
				color2: colors.floss2,
				color3: colors.floss3,
				color4: colors.floss4,
				color5: colors.floss5,
				color: colors.fabric,
				patternRender: embroideryMockup,
			});
			console.timeEnd('render');
		};
	}, [pattern, renderer, crossStitchRenderer]);
	const debouncedRender = useMemo(
		() =>
			debounce(
				(config: CoverConfig) => {
					if (!renderFn.current) return;
					renderFn.current(config);
				},
				50,
				{ leading: true }
			),
		[]
	);
	useEffect(() => console.log('debouncedRender changed'), [debouncedRender]);
	useEffect(() => console.log('pattern changed'), [pattern]);
	useEffect(() => console.log('renderer changed'), [renderer]);
	useEffect(
		() => console.log('crossStitchRenderer changed'),
		[crossStitchRenderer]
	);

	useEffect(() => debouncedRender(state), [state, debouncedRender]);
};
