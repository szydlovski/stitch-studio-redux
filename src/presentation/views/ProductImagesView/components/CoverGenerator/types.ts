'use client';
import { FC } from 'react';

export enum CoverGeneratorStep {
	AdjustColors = 'AdjustColors',
	ReviewImages = 'ReviewImages',
}

export interface CoverGeneratorStepConfig {
	key: CoverGeneratorStep;
	title: string;
	description?: string;
	component: FC;
}

export interface PaddingOptions {
	scale: number;
	xOffset: number;
	yOffset: number;
}

export interface RenderedProductImage {
	canvas: HTMLCanvasElement;
	key: string;
}

export enum ProductImageTag {
	EtsyCover = 'EtsyCover',
	EtsyImage = 'EtsyImage',
	Pinterest = 'Pinterest',
}
