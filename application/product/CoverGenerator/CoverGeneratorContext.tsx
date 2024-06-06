'use client';
import { ProductDetails } from '@/domain/product/ProductDetails';
import { getSquarePadding } from '@/lib/helpers';
import { UseStepper, useStepper } from '@/lib/hooks/useStepper';
import { Pattern } from '@/lib/pattern/pattern';
import { RenderedProductImage } from '@/lib/templateRendering';
import {
	createContext,
	useCallback,
	useContext,
	useReducer,
	useState,
} from 'react';
import { COVER_GENERATOR_STEPS_ORDER } from './config';
import {
	ColorKey,
	CoverGeneratorAction,
	CoverGeneratorActions,
	CoverGeneratorState,
	coverGeneratorReducer,
} from './reducer';
import { CoverGeneratorStep } from './types';

interface ProductImageState {
	render: RenderedProductImage;
	src: string;
	uploaded?: boolean;
	uploading?: boolean;
	error?: boolean;
	errorMessage?: string;
}

interface CoverGeneratorContextValue {
	pattern: Pattern;
	product: ProductDetails;
	state: CoverGeneratorState;
	dispatch: (action: CoverGeneratorAction) => void;
	resetState: () => void;
	stepper: UseStepper<CoverGeneratorStep>;
	renders: ProductImageState[];
	setRenders: React.Dispatch<
		React.SetStateAction<ProductImageState[] | undefined>
	>;
	rendersLoading: boolean;
	setRendersLoading: React.Dispatch<React.SetStateAction<boolean>>;
	lastRenderedState?: CoverGeneratorState;
	setLastRenderedState: React.Dispatch<
		React.SetStateAction<CoverGeneratorState | undefined>
	>;
	closeGenerator: () => void;
	activeColorKey?: ColorKey;
	setActiveColorKey: React.Dispatch<React.SetStateAction<ColorKey | undefined>>;
}

const CoverGeneratorContext = createContext<CoverGeneratorContextValue>(
	undefined as any
);

export const CoverGeneratorConsumer = CoverGeneratorContext.Consumer;

const getCoverGeneratorInitialState = (
	pattern: Pattern
): CoverGeneratorState => {
	const defaultColor = pattern.groups[0].hex;
	return {
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
		padding: getSquarePadding(pattern, 0.5),
		paddingOptions: {
			scale: 0.5,
			xOffset: 0,
			yOffset: 0,
		},
	};
};

export const CoverGeneratorProvider = ({
	pattern,
	product,
	children,
	onClose,
}: {
	pattern: Pattern;
	product: ProductDetails;
	children: React.ReactNode;
	onClose: () => void;
}) => {
	const stepper = useStepper({
		steps: COVER_GENERATOR_STEPS_ORDER,
	});
	const [state, dispatch] = useReducer(
		coverGeneratorReducer,
		getCoverGeneratorInitialState(pattern)
	);
	const [rendersLoading, setRendersLoading] = useState<boolean>(false);
	const [lastRenderedState, setLastRenderedState] =
		useState<CoverGeneratorState>();
	const [activeColorKey, setActiveColorKey] = useState<ColorKey>();
	const [renders = [], setRenders] = useState<ProductImageState[]>();
	const resetState = useCallback(
		() =>
			dispatch(
				CoverGeneratorActions.setState(getCoverGeneratorInitialState(pattern))
			),
		[pattern]
	);
	return (
		<CoverGeneratorContext.Provider
			value={{
				pattern,
				product,
				stepper,
				state,
				dispatch,
				resetState,
				renders,
				setRenders,
				rendersLoading,
				setRendersLoading,
				lastRenderedState,
				setLastRenderedState,
				closeGenerator: onClose,
				activeColorKey,
				setActiveColorKey,
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
