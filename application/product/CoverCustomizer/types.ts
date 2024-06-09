import { CrossStitchPattern } from '@/lib/cross-stitch';
import { CSSProperties } from 'react';
import { CoverConfig } from '../CoverGenerator/coverConfigReducer';
import { RendererContextType } from '@/components/context/RendererContext';
import { RenderedProductImage } from '../CoverGenerator/types';

export type CoverColorPickerConfig = {
	x: number;
	y: number;
	palette?: string[];
	side?: 'top' | 'right' | 'bottom' | 'left';
};

export type CoverColorPickerConfigMap<ColorKey extends string = string> =
	Partial<Record<ColorKey, CoverColorPickerConfig>>;

export interface RenderCoverProps {
	pattern: CrossStitchPattern;
	config: CoverConfig<string>;
	context: RendererContextType;
}

export interface CustomizableCoverTemplate<ColorKey extends string = string> {
	name: string;
	controls: CoverColorPickerConfigMap<ColorKey>;
	renderPreview: (
		props: RenderCoverProps,
		ctx: CanvasRenderingContext2D
	) => void;
	renderCovers: (props: RenderCoverProps) => Promise<RenderedProductImage[]>;
}
