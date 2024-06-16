'use client';
import { CoverCustomizer } from '../CoverCustomizer';
import {
	Button,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components/ui';
import { useCallback } from 'react';
import { StitchFairyCoCover } from '@/brand/StitchFairyCo';
import { useCoverGeneratorContext } from './CoverGeneratorContext';
import { CoverConfig } from './coverConfigReducer';
import { CoverGeneratorActions } from './reducer';
import { CoverGeneratorStep, CoverGeneratorStepConfig } from './types';
import { ImagesGrid, ImagesGridSkeleton } from './components/ImagesGrid';
import { useCoversRenderer } from './hooks/useCoversRenderer';
import { useCoversUploader } from './hooks/useCoversUploader';

export const CoverGeneratorSteps: Record<
	CoverGeneratorStep,
	CoverGeneratorStepConfig
> = {
	[CoverGeneratorStep.AdjustColors]: {
		key: CoverGeneratorStep.AdjustColors,
		title: 'Customize',
		component: () => {
			const {
				product: { pattern },
				state: { coverConfig },
				dispatch,
				stepper: { hasNext, nextStep },
			} = useCoverGeneratorContext();

			const handleCoverConfigChange = useCallback(
				(value: Partial<CoverConfig>) =>
					dispatch(CoverGeneratorActions.updateCoverConfig(value)),
				[]
			);

			return (
				<>
					<DialogHeader className="mb-6">
						<DialogTitle className="flex gap-4 items-center">
							{'Customize your cover'}
						</DialogTitle>
						<DialogDescription>
							{`Select colors and padding options.`}
						</DialogDescription>
					</DialogHeader>
					<CoverCustomizer
						pattern={pattern}
						initialState={coverConfig}
						onChange={handleCoverConfigChange}
						template={StitchFairyCoCover}
					/>
					<DialogFooter className="mt-6 flex">
						<Button type="submit" disabled={!hasNext} onClick={nextStep}>
							Next
						</Button>
					</DialogFooter>
				</>
			);
		},
	},
	[CoverGeneratorStep.ReviewImages]: {
		key: CoverGeneratorStep.ReviewImages,
		title: 'Preview',
		component: () => {
			const {
				state: { renders },
			} = useCoverGeneratorContext();
			const { rendersLoading } = useCoversRenderer();
			const handleSave = useCoversUploader();
			return (
				<>
					<DialogHeader className="mb-6">
						<DialogTitle className="flex gap-4 items-center">
							{'Review generated images'}
						</DialogTitle>
						<DialogDescription>
							{`Review the generated images and save them to your product.`}
						</DialogDescription>
					</DialogHeader>
					{!rendersLoading ? (
						<ImagesGrid images={renders} />
					) : (
						<ImagesGridSkeleton />
					)}
					<DialogFooter className="mt-6">
						<Button type="submit" onClick={handleSave}>
							Save
						</Button>
					</DialogFooter>
				</>
			);
		},
	},
};

export const CoverGeneratorStepOrder = [
	CoverGeneratorStep.AdjustColors,
	CoverGeneratorStep.ReviewImages,
];
