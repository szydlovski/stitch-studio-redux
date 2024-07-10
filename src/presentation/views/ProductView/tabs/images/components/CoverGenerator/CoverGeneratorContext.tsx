'use client';
import { FullProductObject } from '@domain/product';
import { CrossStitchPattern } from '@domain/cross-stitch';
import { UseStepper, useStepper } from '@lib/hooks/useStepper';
import {
	createContext,
	useCallback,
	useContext,
	useReducer
} from 'react';
import { CoverGeneratorStepOrder } from './CoverGeneratorSteps';
import {
	CoverGeneratorAction,
	CoverGeneratorActions,
	CoverGeneratorState,
	coverGeneratorReducer,
} from './reducer';
import { CoverGeneratorStep } from './types';


interface CoverGeneratorContextValue {
	product: FullProductObject;
	state: CoverGeneratorState;
	dispatch: (action: CoverGeneratorAction) => void;
	reset: () => void;
	stepper: UseStepper<CoverGeneratorStep>;
	close: () => void;
}

const CoverGeneratorContext = createContext<CoverGeneratorContextValue>(
	undefined as any
);

export const CoverGeneratorConsumer = CoverGeneratorContext.Consumer;

const getCoverGeneratorInitialState = (
	pattern: CrossStitchPattern
): CoverGeneratorState => {
	const defaultColor = pattern.colors[0].color;
	return {
		renders: [],
		coverConfig: {
			scale: 0.5,
			xOffset: 0,
			yOffset: 0,
			colors: {
				fabric: defaultColor,
				frame: defaultColor,
				pinterestBar: defaultColor,
				background: '#ffffff',
				floss1: pattern.colors[1]?.color ?? defaultColor,
				floss2: pattern.colors[2]?.color ?? defaultColor,
				floss3: pattern.colors[3]?.color ?? defaultColor,
				floss4: pattern.colors[4]?.color ?? defaultColor,
				floss5: pattern.colors[5]?.color ?? defaultColor,
			},
		},
	};
};

export const CoverGeneratorProvider = ({
	product,
	children,
	onClose,
}: {
	product: FullProductObject;
	children: React.ReactNode;
	onClose: () => void;
}) => {
	const stepper = useStepper({
		steps: CoverGeneratorStepOrder,
	});
	const [state, dispatch] = useReducer(
		coverGeneratorReducer,
		getCoverGeneratorInitialState(product.pattern)
	);
	const resetState = useCallback(
		() =>
			dispatch(
				CoverGeneratorActions.setState(
					getCoverGeneratorInitialState(product.pattern)
				)
			),
		[product.pattern]
	);
	return (
		<CoverGeneratorContext.Provider
			value={{
				product,
				stepper,
				state,
				dispatch,
				reset: resetState,
				close: onClose,
			}}
		>
			{children}
		</CoverGeneratorContext.Provider>
	);
};

export const useCoverGeneratorContext = () => {
	const context = useContext(CoverGeneratorContext);
	if (!context) {
		throw new Error(
			'useCoverGeneratorContext must be used within a CoverGeneratorProvider'
		);
	}
	return context;
};
