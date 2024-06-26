import { BrandAttributes } from '@domain/brand';
import {
	CoverConfig,
	CoverConfigSchema,
} from '@presentation/views/ProductImagesView/components/CoverGenerator/coverConfigReducer';
import { z } from 'zod';

import { StaticImageData } from 'next/image';

export interface ProductBrand {
	id: string;
	name: string;
	attributes: BrandAttributes;
	owner: {
		id: string;
		name: string;
	};
	logo: StaticImageData;
}

export interface ProductAuthor {
	id: string;
	name: string;
	email: string;
	avatar?: StaticImageData;
}

export interface HoopMockupConfig {
	background: string;
	scale: number;
	xOffset: number;
	yOffset: number;
}

export const HoopMockupConfigSchema = z
	.object({
		background: z.string(),
		scale: z.number().min(0).max(1),
		xOffset: z.number(),
		yOffset: z.number(),
	})
	.strict();

export interface ProductAttributes {
	hoopConfig?: HoopMockupConfig;
	coverConfig?: CoverConfig;
	printableConfig?: any;
	etsyPublishedListingPayload?: any;
	dismissedFromBoard?: boolean;
}

export const ProductAttributesSchema = z
	.object({
		hoopConfig: HoopMockupConfigSchema.optional(),
		coverConfig: CoverConfigSchema.optional(),
		printableConfig: z.any().optional(),
		etsyPublishedListingPayload: z.any().optional(),
		dismissedFromBoard: z.boolean().optional(),
	})
	.strict();
