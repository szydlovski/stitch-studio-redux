'use client';
import { Step2AdjustColors } from './steps/Step2AdjustColors';
import { Step3ReviewImages } from './steps/Step3ReviewImages';
import { CoverGeneratorStep, CoverGeneratorStepConfig } from './types';

export const COVER_GENERATOR_STEPS: Record<
	CoverGeneratorStep,
	CoverGeneratorStepConfig
> = {
	[CoverGeneratorStep.AdjustColors]: {
		key: CoverGeneratorStep.AdjustColors,
		title: 'Customize',
		component: () => <Step2AdjustColors />,
	},
	[CoverGeneratorStep.ReviewImages]: {
		key: CoverGeneratorStep.ReviewImages,
		title: 'Preview',
		component: () => <Step3ReviewImages />,
	},
};

export const COVER_GENERATOR_STEPS_ORDER = [
	CoverGeneratorStep.AdjustColors,
	CoverGeneratorStep.ReviewImages,
];
