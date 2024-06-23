'use client';
import { useRendererContext } from '@components/context/RendererContext';
import isEqual from 'lodash.isequal';
import { useCallback, useEffect, useState } from 'react';
import { StitchFairyCoCover } from '@brand/StitchFairyCo';
import { useCoverGeneratorContext } from '../CoverGeneratorContext';
import { CoverGeneratorActions, CoverRenderState } from '../reducer';

export const useCoversRenderer = () => {
	const rendererContext = useRendererContext();
	const { product, dispatch, state } = useCoverGeneratorContext();
	const [rendersLoading, setRendersLoading] = useState(false);
	const setRenders = useCallback(
		(renders: CoverRenderState[]) =>
			dispatch(CoverGeneratorActions.setState({ renders })),
		[dispatch]
	);

	useEffect(() => {
		const configChanged = !isEqual(state.coverConfig, state.lastCoverConfig);
		if (!configChanged) return;
		setRendersLoading(true);
		StitchFairyCoCover.renderCovers({
			pattern: product.pattern,
			config: state.coverConfig,
			context: rendererContext,
		}).then((renders) => {
			setRenders(
				renders.map(({ key, canvas }) => ({
					key,
					src: canvas.toDataURL(),
					width: canvas.width,
					height: canvas.height,
				}))
			);
			setRendersLoading(false);
			dispatch(
				CoverGeneratorActions.setState({ lastCoverConfig: state.coverConfig })
			);
		});
	}, [
		product,
		state.coverConfig,
		dispatch,
		rendererContext,
		setRenders,
		setRendersLoading,
		state.lastCoverConfig,
	]);

	return { rendersLoading };
};
