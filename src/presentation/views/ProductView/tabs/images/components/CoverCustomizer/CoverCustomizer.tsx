'use client';
import { CrossStitchPattern } from '@domain/cross-stitch';
import {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import { CoverColorPicker } from './components/CoverColorPicker';
import {
	CoverConfig,
	CoverConfigActions,
	coverConfigReducer,
} from '../CoverGenerator/coverConfigReducer';
import { ColorPicker, ColorPickerPlaceholer } from './components/ColorPicker';
import { PaddingOptionsInput } from './components/PaddingOptionsInput';
import { usePreviewRenderer } from './hooks/usePreviewRenderer';
import { CoverColorPickerConfig, CustomizableCoverTemplate } from './types';
import { etsyCoverTemplate } from '@brand/StitchFairyCo/cover/templates';
import { Template } from '@infrastructure/product-image/template-engine';

export const CoverCustomizer = <ColorKey extends string = string>({
	pattern,
	initialState,
	template: { controls: pickersConfig, renderPreview: render },
	onChange,
}: {
	pattern: CrossStitchPattern;
	initialState: CoverConfig;
	template: CustomizableCoverTemplate;
	onChange?: (value: CoverConfig<ColorKey>) => void;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [state, dispatch] = useReducer(coverConfigReducer, initialState);
	const { scale, xOffset, yOffset } = state;
	useEffect(() => onChange?.(state), [state, onChange]);

	const [activeColorKey, setActiveColorKey] = useState<ColorKey>();
	const updateActiveColor = useCallback(
		(color: string) =>
			activeColorKey &&
			dispatch(
				CoverConfigActions.setColor({ key: activeColorKey, value: color })
			),
		[activeColorKey]
	);

	usePreviewRenderer({
		pattern,
		state,
		canvasRef,
		debounce: 50,
		template: new Template(etsyCoverTemplate),
	});

	const palette = useMemo(
		() => [
			...((activeColorKey && pickersConfig[activeColorKey]?.palette) ?? []),
			...pattern.colors.map(({ color }) => color),
		],
		[activeColorKey, pattern.colors, pickersConfig]
	);

	const pickerEntries = Object.entries(pickersConfig) as [
		string,
		CoverColorPickerConfig
	][];

	return (
		<div className="grid gap-4">
			<div className="relative">
				<canvas
					ref={canvasRef}
					className="w-full rounded-md border"
					width={1259}
					height={1000}
				/>
				{pickerEntries.map(([key, { x, y }]) => (
					<CoverColorPicker
						active={activeColorKey === key}
						key={key}
						style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
						color={state.colors[key]}
						onClick={() =>
							setActiveColorKey((prev) =>
								prev === key ? undefined : (key as ColorKey)
							)
						}
					/>
				))}
			</div>
			<div className="grid grid-cols-2 gap-4 h-[200px]">
				<div className="border rounded-md h-full">
					<PaddingOptionsInput
						value={{ scale, xOffset, yOffset }}
						onValueChange={(options) =>
							dispatch(CoverConfigActions.setState(options))
						}
					/>
				</div>
				<div className="border rounded-md h-full ">
					{activeColorKey ? (
						<ColorPicker
							value={state.colors[activeColorKey]}
							onChange={updateActiveColor}
							palette={palette}
						/>
					) : (
						<ColorPickerPlaceholer />
					)}
				</div>
			</div>
		</div>
	);
};
