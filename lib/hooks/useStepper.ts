import { useState, useMemo, useCallback } from 'react';

export interface UseStepperProps<T extends string> {
	steps: T[];
	initialStep?: T;
}

export interface UseStepper<T extends string> {
	step: T;
	setStep: (step: T) => void;
	nextStep: () => void;
	prevStep: () => void;
	resetSteps: () => void;
	hasNext: boolean;
	hasPrev: boolean;
	canReset: boolean;
}

export const useStepper = <T extends string>({
	steps,
	initialStep = steps[0],
}: UseStepperProps<T>) => {
	const [step, setStep] = useState<T>(initialStep);
	const canReset = useMemo(() => step !== initialStep, [step, initialStep]);
	const resetSteps = useCallback(
		() => setStep(initialStep),
		[initialStep, setStep]
	);
	const hasNext = useMemo(
		() => steps.indexOf(step) < steps.length - 1,
		[step, steps]
	);
	const hasPrev = useMemo(() => steps.indexOf(step) > 0, [step, steps]);
	const nextStep = useCallback(() => {
		if (hasNext) {
			setStep(steps[steps.indexOf(step) + 1]);
		}
	}, [hasNext, step, steps]);
	const prevStep = useCallback(() => {
		if (hasPrev) {
			setStep(steps[steps.indexOf(step) - 1]);
		}
	}, [hasPrev, step, steps]);
	return {
		step,
		setStep,
		nextStep,
		prevStep,
		resetSteps,
		hasNext,
		hasPrev,
		canReset,
	};
};
