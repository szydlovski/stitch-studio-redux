'use client';
import { ProductDetails } from '@/domain/product/ProductDetails';
import { CrossStitchPattern } from '@/lib/cross-stitch';
import { UseStepper, useStepper } from '@/lib/hooks/useStepper';
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
	product: ProductDetails;
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
	const defaultColor = pattern.groups[0].hex;
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
				floss1: pattern.groups[1].hex ?? defaultColor,
				floss2: pattern.groups[2].hex ?? defaultColor,
				floss3: pattern.groups[3].hex ?? defaultColor,
				floss4: pattern.groups[4].hex ?? defaultColor,
				floss5: pattern.groups[5].hex ?? defaultColor,
			},
		},
	};
};

export const CoverGeneratorProvider = ({
	product,
	children,
	onClose,
}: {
	product: ProductDetails;
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
